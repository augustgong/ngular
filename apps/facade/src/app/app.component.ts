import { Component } from '@angular/core';
import {
  ScreenObserver, ScreenChange,
  DEFAULT_BREAKPOINTS_ALIAS as DeBrAlias
} from '@libs/screen';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'facade';
  constructor(
    private screenObserver: ScreenObserver,
  ) {
    this.screenObserver.asObservable().subscribe((changes: ScreenChange[]) => {
      console.log(changes);
    });
  }
}
