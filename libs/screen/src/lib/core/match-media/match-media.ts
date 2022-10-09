/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {Inject, Injectable, NgZone, PLATFORM_ID} from '@angular/core';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {BehaviorSubject, Observable, merge, Observer} from 'rxjs';
import {filter} from 'rxjs/operators';

import {ScreenChange} from '../screen-change';

/**
 * MediaMonitor configures listeners to mediaQuery changes and publishes an Observable facade to
 * convert mediaQuery change callbacks to subscriber notifications. These notifications will be
 * performed within the ng Zone to trigger change detections and component updates.
 *
 * NOTE: both mediaQuery activations and de-activations are announced in notifications
 */
@Injectable({providedIn: 'root'})
export class MatchMedia {
  /** Initialize source with 'all' so all non-responsive APIs trigger style updates */
  readonly source = new BehaviorSubject<ScreenChange>(new ScreenChange(true));
  registry = new Map<string, MediaQueryList>();

  constructor(protected _zone: NgZone,
              @Inject(PLATFORM_ID) protected _platformId: Object,
              @Inject(DOCUMENT) protected _document: any) {
  }

  /**
   * Publish list of all current activations
   */
  get activations(): string[] {
    const results: string[] = [];
    this.registry.forEach((mql: MediaQueryList, key: string) => {
      if (mql.matches) {
        results.push(key);
      }
    });
    return results;
  }

  /**
   * For the specified mediaQuery?
   */
  isActive(mediaQuery: string): boolean {
    const mql = this.registry.get(mediaQuery);
    return !!mql ? mql.matches : false;
  }

  /**
   * External observers can watch for all (or a specific) mql changes.
   *
   * If a mediaQuery is not specified, then ALL mediaQuery activations will
   * be announced.
   */
  observe(): Observable<ScreenChange>;
  observe(mediaQueries: string[]): Observable<ScreenChange>;
  observe(mediaQueries: string[], filterOthers: boolean): Observable<ScreenChange>;

  /**
   * External observers can watch for all (or a specific) mql changes.
   * Typically used by the MediaQueryAdaptor; optionally available to components
   * who wish to use the MediaMonitor as mediaMonitor$ observable service.
   *
   * Use deferred registration process to register breakpoints only on subscription
   * This logic also enforces logic to register all mediaQueries BEFORE notify
   * subscribers of notifications.
   */
  observe(mqList?: string[], filterOthers = false): Observable<ScreenChange> {
    if (mqList && mqList.length) {
      const matchMedia$: Observable<ScreenChange> = this._observable$.pipe(
          filter((change: ScreenChange) => {
            return !filterOthers ? true : (mqList.indexOf(change.mediaQuery) > -1);
          })
      );
      const registration$: Observable<ScreenChange> = new Observable((observer: Observer<ScreenChange>) => {  // tslint:disable-line:max-line-length
        const matches: Array<ScreenChange> = this.registerQuery(mqList);
        if (matches.length) {
          const lastChange = matches.pop()!;
          matches.forEach((e: ScreenChange) => {
            observer.next(e);
          });
          this.source.next(lastChange); // last match is cached
        }
        observer.complete();
      });
      return merge(registration$, matchMedia$);
    }

    return this._observable$;
  }

  /**
   * Based on the BreakPointRegistry provider, register internal listeners for each unique
   * mediaQuery. Each listener emits specific ScreenChange data to observers
   */
  registerQuery(mediaQuery: string | string[]) {
    const list = (function listination() {
      return Array.isArray(mediaQuery) ? mediaQuery : [mediaQuery];
    })();
    
    const matches: ScreenChange[] = [];

    buildQueryCss(list, this._document);

    list.forEach((query: string) => {
      const onMQLEvent = (e: MediaQueryListEvent) => {
        this._zone.run(() => this.source.next(new ScreenChange(e.matches, query)));
      };

      let mql = this.registry.get(query);
      if (!mql) {
        mql = this.buildMQL(query);
        mql.addEventListener('change', onMQLEvent);
        this.registry.set(query, mql);
      }

      (function collectEvenIfDuringInit() {
        if (mql.matches) {
          matches.push(new ScreenChange(true, query));
        }
      })();
      
    });

    return matches;
  }

  /**
   * Call window.matchMedia() to build a MediaQueryList; which
   * supports 0..n listeners for activation/deactivation
   */
  protected buildMQL(query: string): MediaQueryList {
    return constructMql(query, isPlatformBrowser(this._platformId));
  }

  protected _observable$ = this.source.asObservable();
}

/**
 * Private global registry for all dynamically-created, injected style tags
 * @see prepare(query)
 */
const ALL_STYLES: { [key: string]: any } = {};

/**
 * For Webkit engines that only trigger the MediaQueryList Listener
 * when there is at least one CSS selector for the respective media query.
 *
 * @param mediaQueries
 * @param _document
 */
function buildQueryCss(mediaQueries: string[], _document: Document) {
  const list = mediaQueries.filter(it => !ALL_STYLES[it]);
  if (list.length > 0) {
    const query = list.join(', ');

    try {
      const styleEl = _document.createElement('style');

      styleEl.setAttribute('type', 'text/css');
      if (!(styleEl as any).styleSheet) {
        const cssText = `
/*
  @angular/flex-layout - workaround for possible browser quirk with mediaQuery listeners
  see http://bit.ly/2sd4HMP
*/
@media ${query} {.fx-query-test{ }}
`;
        styleEl.appendChild(_document.createTextNode(cssText));
      }

      _document.head!.appendChild(styleEl);

      // Store in private global registry
      list.forEach(mq => ALL_STYLES[mq] = styleEl);

    } catch (e) {
      console.error(e);
    }
  }
}

function constructMql(query: string, isBrowser: boolean): MediaQueryList {
  const canListen = (function checkBrowserHasCapableEventListener() {
    return isBrowser && !!(<Window>window).matchMedia('all').addEventListener;
  })();
  
  return canListen
  ? (<Window>window).matchMedia(query)
  : {
    matches: query === 'all' || query === '',
    media: query,
    addEventListener: () => {
    },
    addListener: () => {
    },
    removeListener: () => {
    }
  } as unknown as MediaQueryList;
}
