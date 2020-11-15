import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ScreenServerModule } from '@libs/screen/src/lib/server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ScreenServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
