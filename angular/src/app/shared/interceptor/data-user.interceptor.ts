import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class DataUserInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('Run Interceptor');
    // Get the token
    const token = localStorage.getItem('token');
    
    if (token) {
      // Set Token on Headers
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });      
    }

    return next.handle(request);
  }
}

export const httpInterceptorProviders = {
  provide: HTTP_INTERCEPTORS,
  useClass: DataUserInterceptor,
  multi: true,
};
