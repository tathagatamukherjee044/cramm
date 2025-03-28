import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/dialog/dialog.service';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const dialogService = inject(DialogService);
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error) => {
      let errorMessage = 'An unknown error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message || error.message}`;

        // Handle Unauthorized Error (401)
        if (error.status === 401) {
          console.log(error.error.message);

          if (error.error.message !== "invalidRefresh") {
            console.log("trying refresh token");
            
            // Try to refresh the token
            return authService.refreshToken().pipe(
              switchMap((ref) => {
                if (ref) {
                  // Clone and retry the request with the new token
                  const reqClone = req.clone({
                  });
                  return next(reqClone);
                } else {
                  // No valid refresh token, ask user to log in
                  dialogService.showMinimalInfo("Please Login to Continue");
                  // router.navigate(['/auth/login']);
                  return throwError(() => error);
                }
              }),
              catchError(() => {
                // Refresh failed, force login
                dialogService.showMinimalInfo("Session expired. Please login again.");
                // router.navigate(['/auth/login']);
                return throwError(() => error);
              })
            );
          } else {
            // Refresh token is invalid, force login
            dialogService.showMinimalInfo("Session expired. Please login again.");
            // router.navigate(['/auth/login']);
            return throwError(() => error);
          }
        }
      }

      // Log and display error
      console.log("Showing error message:", errorMessage);
      dialogService.showMinimalInfo(errorMessage);

      // Pass the error along
      return throwError(() => error);
    })
  );
};

