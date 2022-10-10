import { Component } from '@angular/core';
import { ScreenObserver, ScreenObserved } from '@libs/screen';
/*
// If you desire run to builtted source. Use below line.
import { ScreenObserver, ScreenObserved } from '@libs/dist/screen';
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
    this.screenObserver.asObservable().subscribe((observed: ScreenObserved[]) => {
      console.log(observed);
    });
  }
}
