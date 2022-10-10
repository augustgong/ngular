/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {ScreenObserved} from './screen-observed';
import {BreakPoint} from './breakpoints/break-point';

/**
 * For the specified ScreenObserved, make sure it contains the breakpoint alias
 * and suffix (if available).
 */
export function mergeAlias(dest: ScreenObserved, source: BreakPoint | null): ScreenObserved {
  dest = dest ? dest.clone() : new ScreenObserved();
  if (source) {
    dest.mqAlias = source.alias;
    dest.mediaQuery = source.mediaQuery;
    dest.suffix = source.suffix as string;
    dest.priority = source.priority as number;
  }
  return dest;
}
