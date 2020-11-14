# @ngular/screen

## Introduction
😃 Disclaimer: I am not a native english speaker. But i use english first.
Since i feel that the english is a criteria to the widly spread in tech-world.
However, I willing to effort to support for each national language.
See explains witn below of national-language specific.

## Explain with National language specific
<details>
<summary>Explain with English</summary>
This package generated for Angular.

This package excerpts the code from part of 'angular/flex-layout' \
The 'angular/flex-layout' have a function as a core that screen observing. \
'@ngular/screen' only use its screen observing functionality.
  ```sh
$ yarn add @ngular/screen
or
$ npm i @ngular/screen
```

Usage snippet
```ts
import { Injectable } from '@angular/core';
import {
  ScreenObserver, ScreenChange,
  DEFAULT_BREAKPOINTS_ALIAS as DeBrAlias,
} from '@ngular/screen';

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
</details>

<details>
<summary>한국어 설명</summary>
이 패키지는 'Angular 프레임워크'를 사용한다는 기준으로 생성되었습니다.

'@ngular/screen 패키지'는 'screen observing 기능'을 제공합니다. \
'Angular 프레임워크 프로젝트'의 하나인 '@angular/flex-layout 프로젝트'에서 제공하는 핵심 기능중 
'screen observing'기능을 발췌하여 작성 했습니다.

사용법 스닙펫
```ts
import { Injectable } from '@angular/core';
import {
  ScreenObserver, ScreenChange,
  DEFAULT_BREAKPOINTS_ALIAS as DeBrAlias,
} from '@ngular/screen';

@Injectable()
export class ApplayoutService {

  constructor(
    private screenObserver: ScreenObserver,
  ) {
    this.screenObserver.asObservable().pipe(
    ).subscribe((changes: ScreenChange[]) => {
      console.log(changes);
      /**
       * 여기에서 자유롭게 'ScreenChange[]'의 내용을 검토해 보세요.
       * 아래 링크에서 미디어쿼리-레인지-우선순위(MediaQuery Range Prioritization)에 대한 내용을 참고하여
       * 어떤 '브레이크포인트'들이 발생할지 확인할 수 있습니다.
       * https://github.com/angular/flex-layout/wiki/Responsive-API#breakpoint-activation-fallback-algorithm
       */
      
    });
  }
}
```
</details>