import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
// import { LocationStrategy, HashLocationStrategy } from '@angular/common';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // HashStrategy
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy
    // },
    provideHttpClient(withFetch())
  ]
};
