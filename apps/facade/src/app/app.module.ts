import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScreenModule } from '@libs/screen/src/lib/screen.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ScreenModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
