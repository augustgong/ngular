import {APP_BOOTSTRAP_LISTENER, PLATFORM_ID, InjectionToken} from '@angular/core';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';

export function onBootstrapped(_document: Document, platformId: object) {
  return () => {
    if (isPlatformBrowser(platformId)) {
    }
  };
}

export const BROWSER_PROVIDER = {
  provide: APP_BOOTSTRAP_LISTENER as InjectionToken<(() => void)[]>,
  useFactory: onBootstrapped,
  deps: [DOCUMENT, PLATFORM_ID], /* Becomes the parameters for 'removeStyles' */
  multi: true
};
