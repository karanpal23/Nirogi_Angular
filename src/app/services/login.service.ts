import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { LoginResponse } from '../classes/credentials';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

obj:LoginResponse;

private userSubject: BehaviorSubject<LoginResponse | null>;
public user: Observable<LoginResponse | null>;

  //domain final public
  // pppApiLink="https://nirogi.eupchaarharyana.org.in:8080/mmssy/api/v1";
  // url="https://nirogi.eupchaarharyana.org.in:8080/mmssy";

  //pre-production
  // url="http://117.239.177.55:8080/mmssy";
  // pppApiLink="http://117.239.177.55:8080/mmssy/api/v1";
  
  //local
  
  url="http://localhost:8080/mmssy";
  pppApiLink="http://localhost:8080/mmssy/api/v1";

  RespRole:string;
  Token=sessionStorage.getItem('token');
  Userrole!: LoginResponse;
  constructor(private http:HttpClient, private router:Router) {
    this.userSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
   }

  public get userValue() {
    return this.userSubject.value;
  }

  //calling the server to generate server
  generateToken(credential:any){
    //login generate
    
    return this.http.post<LoginResponse>(`${this.url}/login`,credential)
  }


  decryptToken(obj:any){
    const token = obj;
    // Split the token into its three parts: header, payload, and signature
  const parts = token.split(".");
  const header = parts[0];

  // Decode the base64-encoded header
  const decodedHeader = JSON.parse(window.atob(header));

  // Access the header values
  const TokenValue = decodedHeader; // Replace "header_name" with the actual name of the header you want to retrieve
  //console.log(JSON.stringify(headerValue));

  return TokenValue;

  }
  

//for login user
loginUser(obj:any){
  sessionStorage.setItem("token",obj.token);
  //decoding token 

  const token = sessionStorage.getItem('token');

  // Split the token into its three parts: header, payload, and signature
  const parts = token.split(".");
  const header = parts[0];
  const payload = parts[1];

  // Decode the base64-encoded header
  const decodedHeader = JSON.parse(window.atob(header));
  
  const decodedPayload = JSON.parse(atob(payload));
  

  // Access the header values
  const headerValue = decodedHeader; // Replace "header_name" with the actual name of the header you want to retrieve
  //console.log(JSON.stringify(headerValue));
 
  //decoding ends
  sessionStorage.setItem('username',decodedPayload.sub);
  sessionStorage.setItem("role",headerValue.Role);
  sessionStorage.setItem("district",headerValue.District);
  sessionStorage.setItem("facility",headerValue.Facility);
  sessionStorage.setItem("facilityType",headerValue.FacilityType);
  sessionStorage.setItem("firstname",headerValue.Firstname);
  sessionStorage.setItem("lastname",headerValue.Lastname);
  
  
  return true;
}


//to check that user is log in
isLoggedIn(){
  let login=sessionStorage.getItem("token");
  if(login==undefined || login==null || login===''){
    return false;
  }
  else{
    
    return true;
  }
}

//for log out the user
expDate=new Date();
 
logoutObj={
  token:'',
  
};

logoutData() {
  this.logoutObj.token=sessionStorage.getItem('token');
}

logout(){
  this.logoutData();
 var blacklistToken=sessionStorage.getItem('token');  
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${blacklistToken}` 
  });
  
  sessionStorage.removeItem('user');
  this.userSubject.next(null);
  this.http.post(`${this.url}/logout`,this.logoutObj,{headers: headers}).subscribe();
//auth code end

  sessionStorage.removeItem('token');
  sessionStorage.removeItem('role');
  sessionStorage.removeItem('district');
  sessionStorage.removeItem('facility');
  sessionStorage.removeItem('firstname');
  sessionStorage.removeItem('lastname');
  sessionStorage.removeItem("facilityType");
  this.router.navigate(['/login']);

  
  

  return true;
}

isAdmin(){
  var temp=sessionStorage.getItem('role');
  if(temp=="ADMIN" || temp=="Admin"){
    return true;
  }
  else {
    return false;
  }
}

getToken(){
  
  return sessionStorage.getItem("token");
}



getRole(Token:any){
    this.Userrole = Token;

    return this.Userrole;
  
}

getUsernameFromToken(obj:any){

 const token =obj.token;

  // Split the token into its three parts: header, payload, and signature
  const parts = token.split(".");
  const header = parts[0];
  const payload = parts[1];

  // Decode the base64-encoded header
  const decodedHeader = JSON.parse(window.atob(header));
  
  const decodedPayload = JSON.parse(atob(payload));
  

  // Access the header values
  const headerValue = decodedHeader; // Replace "header_name" with the actual name of the header you want to retrieve
  //console.log(JSON.stringify(headerValue));
  return decodedPayload.sub;
 
}


validateToken(obj:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${obj}` 
  });
  return this.http.get(`${this.url}/validateToken`,{headers: headers});
}


}
