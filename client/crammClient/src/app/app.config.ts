import { ApplicationConfig } from '@angular/core';
import { RouteReuseStrategy, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './_shared/_interceptors/auth.interceptor';
import { errorInterceptor } from './_shared/_interceptors/error.interceptor';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// usually this is imported in main.ts but its not needed here, but this is here for future
export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptors([authInterceptor,errorInterceptor])),
        provideClientHydration(withEventReplay()),
      ],
};
