import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../_services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  var  tokenPresent = false
  var reqClone
  console.log("Request is on its way");
  if (!req.headers.has('Authorization')) {
    // If not, clone the request and add the header
    reqClone = req.clone({
      headers : req.headers.set('Authorization', `Bearer ${authService.getAccessToken()}`)
    });
  } else {
    reqClone = req.clone();
  }
  return next(reqClone);
};
