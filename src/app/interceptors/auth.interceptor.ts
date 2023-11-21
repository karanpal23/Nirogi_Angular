import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ModalService } from '../services/modal.service';
import { MyModalComponent } from '../Components/my-modal/my-modal.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private hasAlerted = false;
  constructor(private loginService: LoginService,private router: Router,private modalService: ModalService) {}

 

    // Pass the cloned request to the next handler
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(request).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 401) {
//           // Logout the user
//         if(this.hasAlerted==false){
//           this.hasAlerted=true;
//         window.alert("Session expired or someone else is logged in with same credentials. please login again")
//         }
//         this.loginService.logout();
//         }

//         throw error;
//       })
//     );
//   }
// }

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  return next.handle(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !this.hasAlerted) {
        // Display a message to the user
        const modalRef = this.modalService.open(MyModalComponent);
        modalRef.componentInstance.message = 'Session expired or someone else is logged in with same credentials. please login again';

        this.hasAlerted = true;
       

        // Logout the user after a certain amount of time
        setTimeout(() => {
          this.loginService.logout();
        }, 4000);
        
      }

      throw error;
    })
  );
}
}
