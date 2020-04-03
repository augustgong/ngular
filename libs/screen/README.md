# @tinydesk-angular/screen

This package generated for Angular.

This package excerpts the code from part of 'angular/flex-layout' \
The 'angular/flex-layout' have a function as a core that screen observing. \
'@tinydesk-angular/screen' only use its screen observing functionality.

```sh
$ yarn add @tinydesk-angular/screen
or
$ npm i @tinydesk-angular/screen
```

Usage of in my case on applayout.service.ts
```ts
import { Injectable } from '@angular/core';
import {
  ScreenObserver, ScreenChange,
  DEFAULT_BREAKPOINTS_ALIAS as DeBrAlias,
} from '@tinydesk-angular/screen';

@Injectable()
export class ApplayoutService {

  constructor(
    private screenObserver: ScreenObserver,
  ) {
    this.screenObserver.asObservable().pipe(
    ).subscribe((changes: ScreenChange[]) => {
      /**
       * Feel the changes in here.
       * You can see the changes in precedence of the order according to priority.
       * Via below link you can check the MediaQuery Range Prioritization (breakpoint-activation-fallback-algorithm).
       * https://github.com/angular/flex-layout/wiki/Responsive-API#breakpoint-activation-fallback-algorithm
       */
      console.log(changes);
    });
  }
}
```
