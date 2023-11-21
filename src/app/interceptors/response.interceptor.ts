import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      setHeaders: {
        'Content-Security-Policy': "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com https://code.jquery.com; style-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net"
      }
    });
    return next.handle(modifiedRequest);
  }
}

