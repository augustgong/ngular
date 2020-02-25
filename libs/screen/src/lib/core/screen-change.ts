export type MediaQuerySubscriber = (changes: ScreenChange) => void;

/**
 * Class instances emitted [to observers] for each mql notification
 */
export class ScreenChange {
  property: string = '';
  value: any;

  /**
   * @param matches whether the mediaQuery is currently activated
   * @param mediaQuery e.g. (min-width: 600px) and (max-width: 959.9ppx)
   * @param mqAlias e.g. gt-sm, md, gt-lg
   * @param suffix e.g. GtSM, Md, GtLg
   * @param priority the priority of activation for the given breakpoint
   */
  constructor(
    public matches = false,
    public mediaQuery = 'all',
    public mqAlias = '',
    public suffix = '',
    public priority = 0,
  ) {
  }

  /** Create an exact copy of the ScreenChange */
  clone(): ScreenChange {
    return new ScreenChange(this.matches, this.mediaQuery, this.mqAlias, this.suffix);
  }
}
