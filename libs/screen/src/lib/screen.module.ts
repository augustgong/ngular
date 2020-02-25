import {
  NgModule,
  ModuleWithProviders,
} from '@angular/core';

@NgModule({
  imports: [
  ],
  exports: [
  ],
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
