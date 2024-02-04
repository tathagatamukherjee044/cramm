import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Request is on its way");
  const reqClone = req.clone({
    headers : req.headers.set('Authorization', 'Bearer JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1YWJmMmZmZDVmODQ1NjE3MTYzYjUwOSIsImVtYWlsIjoiYmlsZXlhbmdyeWJpcmRzMjAxM0BnbWFpbC5jb20iLCJuYW1lIjoiVGF0aGFnYXRhIE11a2hlcmplZSIsInZlcmlmaWVkRW1haWwiOmZhbHNlLCJyb2xlIjoic3R1ZGVudCJ9LCJleHAiOjE3MDcwNjc3MzN9.VOv0slFN3BbBsPreIo-lteLzMNi4ZDhBus8eSh75fEw')
  });
  return next(reqClone);
};
