import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAdd } from '../classes/userAdd';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  Token1=sessionStorage.getItem('token');
  

  //domain final public
  // baseUrl="https://nirogi.eupchaarharyana.org.in:8080/mmssy/api/v1/addUser";

 //pre-production
// baseUrl="http://117.239.177.55:8080/mmssy/api/v1/addUser";

 //local---
baseUrl="http://localhost:8080/mmssy/api/v1/addUser";


  constructor(private httpClient:HttpClient) { }


  
  addUser(uA:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    .set('Content-Type', 'application/json;charset=utf-8');
    return this.httpClient.post<UserAdd>(`${this.baseUrl}`,uA,{headers:headers})
  }
}
