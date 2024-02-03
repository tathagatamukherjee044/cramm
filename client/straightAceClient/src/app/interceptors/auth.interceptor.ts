import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Request is on its way");
  const reqClone = req.clone({
    headers : req.headers.set('Token', 'Bearer etuytu')
  });
  return next(reqClone);
};
