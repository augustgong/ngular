import {NgModule, ModuleWithProviders} from '@angular/core';
import {CoreModule} from './core';

@NgModule({
  imports: [CoreModule],
  exports: [],
})
export class ScreenModule {

  static withConfig(
  ): ModuleWithProviders<ScreenModule> {
    return {
      ngModule: ScreenModule,
      // providers: []
    };
  }
}
