import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posts } from '../classes/post';
import { PppSearchedResponse } from '../classes/PppSearchedResponse';
import { addNewPppMembers } from '../classes/addNewPppMember';

@Injectable({
  providedIn: 'root'
})
export class MemberServiceService {

  public Token1=sessionStorage.getItem('token');
 
  //domain final public
//  baseUrl="https://nirogi.eupchaarharyana.org.in:8080"

  //pre-production public
//  baseUrl="http://117.239.177.55:8080"

  //local
   baseUrl="http://localhost:8080";

  constructor(private httpClient:HttpClient) { }

  getMembers(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    return this.httpClient.get<any>(`${this.baseUrl}/mmssy/api/v1/pppList`,{headers: headers})
  }

  // getSeachedMember(obj:any){
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${this.Token1}`
  //   })
  //   return this.httpClient.post<Posts>(`${this.baseUrl}/mmssy/api/v1/getPppList`,obj,{headers: headers});
  // }




  getSeachedMember(obj:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    return this.httpClient.post<PppSearchedResponse>(`${this.baseUrl}/mmssy/api/v1/getPppListOfTwoTables`,obj,{headers: headers});
  }

  getSeachedMemberByDist(obj:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    return this.httpClient.post<Posts>(`${this.baseUrl}/mmssy/api/v1/getPatientData`,obj,{headers: headers});
  }

  getMemberData(obj:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    }).set('Content-Type', 'application/json;charset=utf-8');
    return this.httpClient.post<Posts>(`${this.baseUrl}/mmssy/api/v1/PppPateintDataSearch`,obj,{headers: headers});
  }


  getPatientHistoryCheck(obj:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    }).set('Content-Type', 'application/json;charset=utf-8');
    return this.httpClient.post<Posts>(`${this.baseUrl}/mmssy/api/v1/CountPatient`,obj,{headers: headers});
  }

  calculateAge(dateOfBirth: string): number {
    console.log(dateOfBirth+"+++++++++")
    const dob = new Date(dateOfBirth);
    const today = new Date();
    
    let age = today.getFullYear() - dob.getFullYear();
    
    // Adjust age based on the month and day
    if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
      age--;
    }
    console.log(age+"------");
    return age;
  }

  addNewPppMember(obj:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    return this.httpClient.post<addNewPppMembers>(`${this.baseUrl}/mmssy/api/v1/addNewPppMember`,obj,{headers: headers});
  }

  

getPendingRecordCount(obj:any){
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.Token1}`
  })
  console.log("inside pending")
  return this.httpClient.post(`${this.baseUrl}/mmssy/api/v1/PendingReportCount`,obj,{headers: headers});

}
}
