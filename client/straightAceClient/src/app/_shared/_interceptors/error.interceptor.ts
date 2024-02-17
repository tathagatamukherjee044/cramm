import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { PopupService } from '../../_services/toast.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const popupService = inject(PopupService)
  const alertService = inject(AlertService)
  const nav = inject(NavController)
  const router = inject(Router)
  const authService = inject(AuthService)
  return next(req).pipe(
    catchError((error) => {
      let errorMessage = 'An unknown error occurred';
      console.log("error cought");
      console.log(error);
      
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

        // has to be improves we must reload automayically but not get stuck in infinite apu calls and relaods
        if(error.status === 401){
          console.log(error.error.message);


          if(error.error.message !== "invalidRefresh"){
            authService.refreshToken()
            alertService.presentReloadAlert()
          } else {
            alertService.presentLoginAlert()
          }
        }
      }

      //implement this
      // if (error.status === 401) {
      //   const refreshToken = this.tokenService.getRefreshToken();
      //   if (refreshToken) {
      //     return authService.refreshToken(refreshToken).pipe(
      //       switchMap((newAccessToken) => {
      //         this.tokenService.storeAccessToken(newAccessToken);
      //         request = request.clone({
      //           setHeaders: { Authorization: `Bearer ${newAccessToken}` },
      //         });
      //         return next.handle(request);
      //       }),
      //       catchError(() => {
      //         // Refresh failed or no refresh token, redirect to login
      //         this.authService.logout();
      //         return throwError(error);
      //       })
      //     );
      //   } else {
      //     // No refresh token, redirect to login
      //     this.authService.logout();
      //   }
      // }

      // You can handle or log the error here as needed
      popupService.presentToast(errorMessage)
      console.log(errorMessage);
      
      // Pass the error along to be handled by the calling code
      return throwError(() => error);
    })
  );

};
