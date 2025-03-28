import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/_shared/_interceptors/auth.interceptor';
import { errorInterceptor } from './app/_shared/_interceptors/error.interceptor';
import { AuthService } from './app/_services/auth.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



if (!environment.local) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor,errorInterceptor])), provideAnimationsAsync(), provideClientHydration(withEventReplay()),
  ],
});
