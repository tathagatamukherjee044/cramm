import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PopupService } from '../services/toast.service';
import { NavController } from '@ionic/angular';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const popupService = inject(PopupService)
  const nav = inject(NavController)
  return next(req).pipe(
    catchError((error) => {
      let errorMessage = 'An unknown error occurred';
      console.log("error cought");
      
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

        if(error.status === 401){
          nav.navigateRoot('/auth/login')
        }
      }

      // You can handle or log the error here as needed
      popupService.presentToast(errorMessage)
      console.log(errorMessage);
      
      // Pass the error along to be handled by the calling code
      return throwError(() => error);
    })
  );

};
