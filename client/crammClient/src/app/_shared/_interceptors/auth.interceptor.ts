import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../_services/auth.service';
import { inject } from '@angular/core';
import { environment } from 'src/environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  var  tokenPresent = false
  var reqClone = req.clone()
  console.log("Request is on its way");

  if (environment.local) {
    console.log("Local environment detected");
    
    // Local environment: Add Cookie header
    let cookieHeader = reqClone.headers.get('Cookie') || '';
    const allCookies = document.cookie.split(';');
    for (let i = 0; i < allCookies.length; i++) {
      const cookie = allCookies[i].trim();
      console.log(cookie);
      
      if(cookie.startsWith('accessToken=')){  
        cookieHeader += (cookieHeader ? '; ' : '') + cookie;
      }
    }

    if (cookieHeader) {
      reqClone = reqClone.clone({
        setHeaders: {
          Cookie: cookieHeader,
        },
      });
    }
  } 

  if (!req.headers.has('Authorization')) {
    // If not, clone the request and add the header
    reqClone = reqClone.clone({
      headers : req.headers.set('Authorization', `Bearer ${authService.getAccessToken()}`)
    });
  } else {
    reqClone = reqClone.clone();
  }

  
  // if (!req.headers.has('Authorization')) {
  //   // If not, clone the request and add the header
  //   reqClone = req.clone({
  //     headers : req.headers.set('Authorization', `Bearer ${authService.getAccessToken()}`)
  //   });
  // } else {
  //   reqClone = req.clone();
  // }
  return next(reqClone);
};
