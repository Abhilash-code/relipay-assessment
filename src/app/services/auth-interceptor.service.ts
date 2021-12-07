import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
intercept(req: HttpRequest<any>, next: HttpHandler){
  const modifiedReq = req.clone({headers: req.headers.append('Authkey', 'test-angular-2021')})
  return next.handle(modifiedReq);
}
}
