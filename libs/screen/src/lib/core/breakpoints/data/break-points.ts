/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {BreakPoint} from '../break-point';

export enum DEFAULT_BREAKPOINTS_ALIAS {
  xxs = 'xxs',
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  lt_sm = 'lt-sm',
  lt_md = 'lt-md',
  lt_lg = 'lt-lg',
  lt_xl = 'lt-xl',
  gt_xs = 'gt-xs',
  gt_sm = 'gt-sm',
  gt_md = 'gt-md',
  gt_lg = 'gt-lg'
}

/**
 * NOTE: Smaller ranges have HIGHER priority since the match is more specific
 */
export const DEFAULT_BREAKPOINTS: BreakPoint[] = [
  {
    alias: DEFAULT_BREAKPOINTS_ALIAS.xxs,
    mediaQuery: 'screen and (min-width: 0px) and (max-width: 399.9px)',
    priority: 1100,
  },
  {
    alias: DEFAULT_BREAKPOINTS_ALIAS.xs,
    mediaQuery: 'screen and (min-width: 400px) and (max-width: 599.9px)',
    priority: 1000,
  },
  {
    alias: DEFAULT_BREAKPOINTS_ALIAS.sm,
    mediaQuery: 'screen and (min-width: 600px) and (max-width: 959.9px)',
    priority: 900,
  },
  {
    alias: DEFAULT_BREAKPOINTS_ALIAS.md,
    mediaQuery: 'screen and (min-width: 960px) and (max-width: 1279.9px)',
    priority: 800,
  },
  {
    alias: DEFAULT_BREAKPOINTS_ALIAS.lg,
    mediaQuery: 'screen and (min-width: 1280px) and (max-width: 1919.9px)',
    priority: 700,
  },
  {
    alias: DEFAULT_BREAKPOINTS_ALIAS.xl,
    mediaQuery: 'screen and (min-width: 1920px) and (max-width: 4999.9px)',
    priority: 600,
  },
  {
    alias: DEFAULT_BREAKPOINTS_ALIAS.lt_sm,
    overlapping: true,
    mediaQuery: 'screen and (max-width: 599.9px)',
    priority: 950,
  },
  {
    alias: DEFAULT_BREAKPOINTS_ALIAS.lt_md,
    overlapping: true,
    mediaQuery: 'screen and (max-width: 959.9px)',
    priority: 850,
  },
  {
    alias: DEFAULT_BREAKPOINTS_ALIAS.lt_lg,
    overlapping: true,
    mediaQuery: 'screen and (max-width: 1279.9px)',
    priority: 750,
  },
  {
    alias: DEFAULT_BREAKPOINTS_ALIAS.lt_xl,
    overlapping: true,
    priority: 650,
    mediaQuery: 'screen and (max-width: 1919.9px)',
  },
  {
    alias: DEFAULT_BREAKPOINTS_ALIAS.gt_xs,
    overlapping: true,
    mediaQuery: 'screen and (min-width: 600px)',
    priority: -950,
  },
  {
    alias: DEFAULT_BREAKPOINTS_ALIAS.gt_sm,
    overlapping: true,
    mediaQuery: 'screen and (min-width: 960px)',
    priority: -850,
  }, {
    alias: DEFAULT_BREAKPOINTS_ALIAS.gt_md,
    overlapping: true,
    mediaQuery: 'screen and (min-width: 1280px)',
    priority: -750,
  },
  {
    alias: DEFAULT_BREAKPOINTS_ALIAS.gt_lg,
    overlapping: true,
    mediaQuery: 'screen and (min-width: 1920px)',
    priority: -650,
  }
];

