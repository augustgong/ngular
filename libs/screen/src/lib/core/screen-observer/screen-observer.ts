/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {Injectable, OnDestroy} from '@angular/core';
import {/*class*/ScreenObserved} from '../screen-observed';
import {BreakPointRegistry, OptionalBreakPoint} from '../breakpoints/break-point-registry';
import {MatchMedia} from '../match-media/match-media';
import {PrintHook} from '../media-marshaller/print-hook';
import {Subject, asapScheduler, Observable, of} from 'rxjs';
import {debounceTime, filter, map, switchMap, takeUntil} from 'rxjs/operators';
import {sortDescendingPriority} from '../utils/sort';
import {mergeAlias} from '../add-alias';


/**
 * ScreenObserver enables applications to listen for 1..n mediaQuery activations and to determine
 * if a mediaQuery is currently activated.
 *
 * Since a breakpoint change will first deactivate 1...n mediaQueries and then possibly activate
 * 1..n mediaQueries, the ScreenObserver will debounce notifications and report ALL *activations*
 * in 1 event notification. The reported activations will be sorted in descending priority order.
 *
 * This class uses the BreakPoint Registry to inject alias information into the raw ScreenObserved
 * notification. For custom mediaQuery notifications, alias information will not be injected and
 * those fields will be ''.
 *
 * Note: Developers should note that only ScreenObserved activations (not de-activations)
 *       are announced by the ScreenObserver.
 *
 *  @usage
 *
 *  // RxJS
 *  import { filter } from 'rxjs/operators';
 *  import { ScreenObserver } from '@aps/cdk/screen';
 *
 *  @Component({ ... })
 *  export class EndUsePlaceComponent {
 *    status: string = '';
 *
 *    constructor(screenObserver: ScreenObserver) {
 *      const screen$ = screenObserver.asObservable().pipe(
 *        filter((changes: ScreenObserved[]) => true)   // silly noop filter
 *      );
 *
 *      screen$.subscribe((changes: ScreenObserved[]) => {
 *        let status = '';
 *        changes.forEach( change => {
 *          status += `'${change.mqAlias}' = (${change.mediaQuery}) <br/>` ;
 *        });
 *        this.status = status;
 *     });
 *
 *    }
 *  }
 */
// Point of very interfaced.
@Injectable({providedIn: 'root'})
export class ScreenObserver implements OnDestroy {

  private readonly _screen$: Observable<ScreenObserved[]>;
  private readonly destroyed$ = new Subject<void>();

  /** Filter MediaChange notifications for overlapping breakpoints */
  filterOverlaps = false;


  constructor(
    protected breakpoints: BreakPointRegistry,
    protected matchMedia: MatchMedia,
    protected hook: PrintHook,
  ) {
    this._screen$ = this.watchActivations();
    this._screen$.pipe(
      filter((changes: ScreenObserved[]) => changes.length > 0),
      map((changes: ScreenObserved[]) => changes[0])
    );
  }

  /**
   * Completes the active subject, signalling to all complete for all
   * ScreenObserver subscribers
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Observe changes to current activation 'list'
   */
  asObservable(): Observable<ScreenObserved[]> {
    return this._screen$;
  }

  /**
   * Register all the mediaQueries registered in the BreakPointRegistry
   * This is needed so subscribers can be auto-notified of all standard, registered
   * mediaQuery activations
   */
  private watchActivations() {
    const queries = this.breakpoints.items.map(bp => bp.mediaQuery);
    return this.buildObservable(queries);
  }

  /**
   * Only pass/announce activations (not de-activations)
   * 오직 활성화됨에 대해서만 전달/알림.(비활성회됨에 대해서는 관여하지 않음.)
   *
   * Since multiple-mediaQueries can be activation in a cycle,
   * gather all current activations into a single list of changes to observers
   *
   * Inject associated (if any) alias information into the ScreenObserved event
   * - Exclude mediaQuery activations for overlapping mQs. List bounded mQ ranges only
   * - Exclude print activations that do not have an associated mediaQuery
   *
   * NOTE: the raw ScreenObserved events [from MatchMedia] do not
   *       contain important alias information; as such this info
   *       must be injected into the ScreenObserved
   */
  private buildObservable(mqList: string[]): Observable<ScreenObserved[]> {
    const hasChanges = (changes: ScreenObserved[]) => {
      const isValidQuery = (change: ScreenObserved) => (change.mediaQuery.length > 0);
      return (changes.filter(isValidQuery).length > 0);
    };
    const excludeOverlaps = (changes: ScreenObserved[]) => {
      return !this.filterOverlaps ? changes : changes.filter(change => {
        const bp = this.breakpoints.findByQuery(change.mediaQuery);
        return !bp ? true : !bp.overlapping;
      });
    };

    return this.matchMedia
        .observe(this.hook.withPrintQuery(mqList))
        .pipe(
          filter((change: ScreenObserved) => change.matches),
          debounceTime(0, asapScheduler),
          switchMap(_ => of(this.findAllActivations())),
          map(excludeOverlaps),
          filter(hasChanges),
          takeUntil(this.destroyed$)
        );
  }

  /**
   * Find all current activations and prepare single list of activations
   * sorted by descending priority.
   */
  private findAllActivations(): ScreenObserved[] {
    const mergeMQAlias = (change: ScreenObserved) => {
      const bp: OptionalBreakPoint = this.breakpoints.findByQuery(change.mediaQuery);
      return mergeAlias(change, bp);
    };
    const replaceWithPrintAlias = (change: ScreenObserved) => {
      return this.hook.isPrintEvent(change) ? this.hook.updateEvent(change) : change;
    };

    return this.matchMedia
        .activations
        .map(query => new ScreenObserved(true, query))
        .map(replaceWithPrintAlias)
        .map(mergeMQAlias)
        .sort(sortDescendingPriority);
  }

}
