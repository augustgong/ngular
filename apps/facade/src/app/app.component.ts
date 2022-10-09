import { Component } from '@angular/core';
import { ScreenObserver, ScreenChange } from '@libs/screen';
/*
// If you desire run to builtted source. Use below line.
import { ScreenObserver, ScreenChange } from '@libs/dist/screen';
*/

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
