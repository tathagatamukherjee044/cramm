import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
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
      // console.log("error cought");
      // console.log(error);
      
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

        // has to be improves we must reload automayically but not get stuck in infinite apu calls and relaods
        if(error.status === 401){
          console.log(error.error.message);


          // it works apparantly
          if(error.error.message !== "invalidRefresh"){
            authService.refreshToken().subscribe( ref => {
              if (ref) {
                // alertService.presentReloadAlert
                setTimeout(() => {
                  // we make the failed request again, 
                  const reqClone = req.clone({
                    headers : req.headers.set('Authorization', `Bearer ${authService.getAccessToken()}`)
                  });
                  return next(reqClone);

                // window.location.reload()
                }, 1000);
              } else {
                alertService.presentLoginAlert()

              }
            })
          } else {
            alertService.presentLoginAlert()
          }
        }

        // if (error.status === 401) {
        //     return authService.refreshToken().pipe(
        //       map((newAccessToken) => {
        //         req = req.clone({
        //           setHeaders: { Authorization: `Bearer ${newAccessToken}` },
        //         });
        //         return next(req);
        //       }),
        //       catchError(() => {
        //         // Refresh failed or no refresh token, redirect to login
        //         alertService.presentLoginAlert()
        //         return throwError(() => error);
        //       })
        //     );
          
        // }
      }

      

      // You can handle or log the error here as needed
      popupService.presentToast(errorMessage)

      
      // Pass the error along to be handled by the calling code
      return throwError(() => error);
    })
  );

};
