import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  loginUserRole=sessionStorage.getItem("role");
  constructor(private loginService:LoginService, private router:Router){
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      
      if(this.loginService.isLoggedIn()  ){
        return true;
      }
      
        
        this.router.navigate(['/login']);
        return false;
      
    
  }



  
  
}
