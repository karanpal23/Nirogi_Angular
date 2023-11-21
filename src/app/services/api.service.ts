import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  

  Token1=sessionStorage.getItem('token');

 //domain final public
// baseUrl="https://nirogi.eupchaarharyana.org.in:8080/mmssy/api/v1";

 //pre-production
//  baseUrl="http://117.239.177.55:8080/mmssy/api/v1";

 //local---
baseUrl="http://localhost:8080/mmssy/api/v1";
// baseUrlLogin="http://localhost:8080/mmssy";

  constructor(private httpClient:HttpClient) { }




  generateCsv(date: string, district: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    
    return this.httpClient.get(`${this.baseUrl}/reportsjson/${date}/${district}`,{headers: headers} );
  }
  //

  getNationalHealthProgramsDropdownData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    return this.httpClient.get(`${this.baseUrl}/getNatHealthProgList`,{headers: headers});
  }


  getDropdownData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    return this.httpClient.get(`${this.baseUrl}/getDiagnosisDiseaseList`,{headers: headers});
  }

  //multi select dd 05-06-2023
  getMultiSelectDropdownData(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    return this.httpClient.get<any[]>(`${this.baseUrl}/getDiagnosisDiseaseList`,{headers: headers});
  }
  //ends


  getReports(startDate:string,endDate:string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`,
      'Content-type':`application/vnd.ms-excel` 
    })
    return this.httpClient.get(`${this.baseUrl}/reports/${startDate}+${endDate}`,{observe:'response',headers: headers, responseType:'blob'});
  }

  

  //change password api
  changePassword(credential:any){
    //login generate
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    return this.httpClient.post(`${this.baseUrl}/updatePassword`,credential,{headers: headers})
  }
  //ends
  

  getDistrict(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    return this.httpClient.get(`${this.baseUrl}/distList`,{headers: headers});
  }

  getFacility(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    return this.httpClient.get(`${this.baseUrl}/facilitiesList`,{headers: headers});
  }

  //get facility by district and facility type
  getFacilityByDistrict(obj1:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    return this.httpClient.post(`${this.baseUrl}/getFacility`,obj1,{headers: headers});

  }
  //ends

  getFacilityByName(obj:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    return this.httpClient.post(`${this.baseUrl}/facilityList`,obj,{headers: headers});
  }

  getFacilityType(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    return this.httpClient.get(`${this.baseUrl}/facilityType`,{headers: headers});
  }

//history
  getHistoryRefIdData(ref:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    });
    return this.httpClient.post(`${this.baseUrl}/historyRefDataSearch`,ref,{headers: headers});
  }

  //general
  getGeneralRefIdData(ref:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    });
    return this.httpClient.post(`${this.baseUrl}/generalRefDataSearch`,ref,{headers: headers});
  }
  
  //milestone
  getMilestoneRefIdData(ref:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    });
    return this.httpClient.post(`${this.baseUrl}/milestonesRefDataSearch`,ref,{headers: headers});
  }

  //mandatory
  getMandatoryRefIdData(ref:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    });
    return this.httpClient.post(`${this.baseUrl}/mandatoryRefDataSearch`,ref,{headers: headers});
  }

  //systemic
  getSystemicRefIdData(ref:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    .set('Content-Type', 'application/json;charset=utf-8');
    return this.httpClient.post(`${this.baseUrl}/systemicRefDataSearch`,ref,{headers: headers});
  }

  //diagnosis
  getDiagnosisRefIdData(ref:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    .set('Content-Type', 'application/json;charset=utf-8');
    return this.httpClient.post(`${this.baseUrl}/DiagnosisRefDataSearch`,ref,{headers: headers});
  }


  //save mandatory data through reference id

  getPersonalData(ref:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    .set('Content-Type', 'application/json;charset=utf-8');
    return this.httpClient.post(`${this.baseUrl}/PppPateintDataSearch`,ref,{headers: headers});
  }

  getPatientDataByMemberId(memberId:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    })
    .set('Content-Type', 'application/json;charset=utf-8');
   
    return this.httpClient.get(`${this.baseUrl}/getPatientScreenedData/${memberId}`,{headers: headers});
  }
  
  //file upload

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {    
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.Token1}`
  });
  
  const data: FormData = new FormData();    
  data.append('file', file);    
  const newRequest = new HttpRequest('POST', `${this.baseUrl}/createUser`, data, 
  {
    headers: headers,
    reportProgress: true,
    responseType: 'text',
    
  });    
  
  return this.httpClient.request(newRequest);
}

//captcha
authenticateCaptcha(code: string) {
  return this.httpClient.post<any>(`http://localhost:8080/captcha`, { code }).pipe(
    catchError(error => throwError('Captcha verification failed.'))
  );
}


//service to get data of patient to view 

getPatientAllDataByMemberId(ref: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token1}`
    }).set('Content-Type', 'application/json;charset=utf-8');

    return this.httpClient.get(`${this.baseUrl}/getPatientScreenedData/${ref}`, { headers: headers });
  }
}
