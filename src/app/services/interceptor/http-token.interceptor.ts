import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../token/token.service';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(TokenService).token;
  console.log('Auth Interceptor called with token'+ token);
  

  if (token) {
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', ('Bearer '+token))
    });
    return next(authRequest);
  }
  return next(req);
};
  