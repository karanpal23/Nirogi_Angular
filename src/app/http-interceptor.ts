import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class MyHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // TODO: Add code to disable OPTIONS method
      if (req.method === 'OPTIONS') {
        return new Observable(observer => {
          observer.complete();
        });
      }
      // Pass on the request to the next handler
    return next.handle(req);
    }
  }
  