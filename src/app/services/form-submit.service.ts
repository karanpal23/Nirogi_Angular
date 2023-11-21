import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormSubmitService {

  constructor(private httpClient:HttpClient, private router:Router) { }

  Token1=sessionStorage.getItem('token');


 //domain final public
//  baseUrl="https://nirogi.eupchaarharyana.org.in:8080/mmssy/api/v1";

  //pre-production
  // baseUrl="http://117.239.177.55:8080/mmssy/api/v1";

  //local
  baseUrl="http://localhost:8080/mmssy/api/v1";
  
 

  addMandatoryInves(formData:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    .set('Content-Type', 'application/json;charset=utf-8');
    return this.httpClient.post(`${this.baseUrl}/submitMandatoryInves`,formData,{headers:headers})
  }

  goBack(){
    this.router.navigate(['/']);
  }


  addOrderedInvestigations(formData:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    .set('Content-Type', 'application/json;charset=utf-8');
    return this.httpClient.post(`${this.baseUrl}/submitOrderedMandatoryInves`,formData,{headers:headers})

  }


  addFormAllCategory(formData:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    .set('Content-Type', 'application/json;charset=utf-8');
    return this.httpClient.post(`${this.baseUrl}/submitCatagByMobApp`,formData,{headers:headers})
  }

}
