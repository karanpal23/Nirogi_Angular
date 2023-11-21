import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';
import { TokenParams } from 'src/app/classes/TokenParams';
import { LoginResponse } from 'src/app/classes/credentials';
import { MatDialog } from '@angular/material/dialog';
import * as CryptoJS from 'crypto-js';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  roleBased:LoginResponse;
  Token=sessionStorage.getItem('token');
  tokenParam:TokenParams;
  loginLoader=false;
  spinner=false;

  emptyField=false;
  loginForm:FormGroup;
  submitted=false;
 loginError=false;

 msz="wrong credentials";

  hide = true;

  //crendentials to send in api
  credential={
    username:'',
    password:'',
    
  };
  //ends

  //form input fields validations
  loginInput = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  obj:LoginResponse;
  am:any[];
  displaytoken:string;

  get token():any{
    return sessionStorage.getItem("role");
  }
  constructor(private loginService:LoginService, private router: Router,private formBuilder:FormBuilder,public dialog: MatDialog) { 
    
    
  }

  ngOnInit() {  
    
  }
  
  //popup

  encryptObj={
    username:'',
    password:'',
    
  };
  encryptData() {
    this.encryptObj.username=CryptoJS.AES.encrypt(JSON.stringify(this.credential.username), "EDUNPS").toString();
    this.encryptObj.password=CryptoJS.AES.encrypt(JSON.stringify(this.credential.password), "EDUNPS").toString();
    

  }
  

  onSubmit()
  {
    this.loginLoader=true;
    if((this.credential.username!='' && this.credential.password!='') && (this.credential.username!=null && this.credential.password!=null)){
      
      this.spinner=true;
      this.encryptData();
      console.log(this.encryptObj);
     this.loginService.generateToken(this.encryptObj).subscribe(
        (response:any)=>{
          this.obj=response;
          this.roleBased=response;
          this.loginLoader=false;
          this.spinner=false;

          console.log(response);

          this.loginService.validateToken(this.obj.token).subscribe((res:any)=>{
            if(res==true){
              const usernameFromToken=this.loginService.getUsernameFromToken(this.obj);
              if(usernameFromToken==this.credential.username){
              sessionStorage.setItem('loginResponse',response);
              
              
              this.loginService.loginUser(this.obj);
              const role=sessionStorage.getItem('role');
              
              
                if(role!='USER' && role!='user' && role!='User' ){
                  
      
                  
                  this.router.navigate(['/add-user'])
                  
                  
                }
                else{
                  
                  this.router.navigate(['/home'])
                }
                }
                else{
                  console.log("invalid user")
                }
            }
          },
          (error:any)=>{
            this.loginError=true
            this.loginLoader=false;
            this.spinner=false;
            window.alert(error.status+"session expire login again"+error.msg);
                        
          });
       
          
        },
        (error:any)=>{
          this.loginError=true
          this.loginLoader=false;
          this.spinner=false;
          this.emptyField=false;
          alert(error.status+" "+error.error);
          console.log(error);
                     
        }
        
      )
  
    }
    else{
      this.emptyField=true;
      this.loginError=false
      
    }
    
  }


  //new login method

  

}


