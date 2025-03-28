import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  var reqClone = req.clone()
  console.log("Request is on its way");
  return next(reqClone);
};
