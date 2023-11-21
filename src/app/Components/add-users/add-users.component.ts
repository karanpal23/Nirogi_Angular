import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserAdd } from 'src/app/classes/userAdd';
import { AddUserService } from 'src/app/services/add-user.service';
import { ApiService } from 'src/app/services/api.service';
import { FacilitySearch } from 'src/app/classes/FacilitiesSearch';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import * as XLSX from 'xlsx';


import { Reports } from 'src/app/classes/Reports';

import { saveAs } from 'file-saver';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  msg: string;

  districtName:any;
  hide = true;
  districtNameList: any;
  facilityNameList:any;
  facilityType:any;
  toastr: any;
  constructor(private users:AddUserService, private apiService:ApiService,private httpClient:HttpClient) { }

  searchedList:any;
 
  obj:UserAdd;


  
   AU={
    firstName:new FormControl('', [Validators.required,Validators.max(20)]),
    lastName:new FormControl('', [Validators.required,Validators.maxLength(20)]),
    userName:new FormControl('', [Validators.required,Validators.maxLength(20)]),
    password:new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(20)]),
    designation:new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(20)]),
    role:'',
    district:'',
    facility:'',
    mobile:new FormControl('', [Validators.required,Validators.maxLength(10)]),
    email:new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(20)])
  };
  
 //downlload bar
 //download bar ends
  loginUserRole=sessionStorage.getItem("role");
  loginUserDist=sessionStorage.getItem("district");

  myAddUserForm:FormGroup;
  
  ngOnInit() {
    this.getDistList();
    this.getFacilityList();
   // this.getFacilityTpeList();

   this.myAddUserForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    lastName: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    userName: new FormControl('', [Validators.required]),
    passWord: new FormControl('', [Validators.required]),
    userRole: new FormControl('', [Validators.required]),
    desigNation:new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email,, Validators.pattern('[a-zA-Z0-9.]+@[a-zA-Z0-9.]+')]),
    mobile: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10),Validators.pattern('[0-9]+')])
  });

    if(this.showList==true){
      
    }

    //download excel start
    
    
    //downloadbar ends


    //disable mobile number alphabet letters
   
  }

  //crendentials to send in api
  credential={
    username:'',
    password:'',
    
  };
  //ends

  //encrypt new credentials and change password
  encryptObj={
    username:'',
    password:'',
    
  };
  encryptData() {
    this.encryptObj.username=CryptoJS.AES.encrypt(JSON.stringify(this.credential.username).trim(), "EDUNPS").toString();
    this.encryptObj.password=CryptoJS.AES.encrypt(JSON.stringify(this.credential.password).trim(), "EDUNPS").toString();

  }


  changePassword(){
    if((this.credential.username!='' && this.credential.password!='') && (this.credential.username!=null && this.credential.password!=null)){
      
      this.encryptData();
      this.apiService.changePassword(this.encryptObj).subscribe({next:res=>{
        window.alert("password updated successfully.");
      },
      error: (err: HttpErrorResponse) => {
       alert(err.status+"Something went wrong, could not perform the action");
       
     }})
    }
  }



  //ends

  //excel working
//  const templatePath = 'assets/Report_format.xlsx';
   
  
  ////
  //2 sec csv download

  //  convertToCSV(objArray: any, headerList:any) {
  //   let array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  //   let str = '';
  //   let row = 'S.No,';
    
  //   for (let index in headerList) {
  //     row += headerList[index] + ',';
  //   }
    
  //   row = row.slice(0, -1);
  //   str += row + '\r\n';
    
  //   for (let i = 0; i < array.length; i++) {
  //     let line = (i + 1) + ',';
      
  //     for (let index in headerList) {
  //       let head = headerList[index];
  //       line += array[i][head]+',';
  //     }
      
  //     str += line + '\r\n';
  //   }
    
  //   return str;
  // }

  convertToCSV(objArray: any, headerList: any) {
    let array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';
  
    for (let index in headerList) {
      row += headerList[index] + ',';
    }
  
    row = row.slice(0, -1);
    str += row + '\r\n';
  
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + ',';
  
      for (let index in headerList) {
        let head = headerList[index];
        let value = array[i][head];
  
        // Escape commas in the value
        if (typeof value === 'string') {
          value = value.replace(/"/g, '""'); // Escape double quotes
          if (value.includes(',')) {
            value = '"' + value + '"'; // Enclose in double quotes
          }
        }
  
        line += value + ',';
      }
  
      str += line + '\r\n';
    }
  
    return str;
  }
  
  
  //
  downloadFile() {
    this.DownloadProgLoading=true;
    var startDate = formatDate(this.Dates.from, 'yyyy-MM-dd', 'en-US');
  
  //District
  var e = (document.getElementById("DistrictName")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var District = (<HTMLSelectElement><unknown>opt).innerText;

  District=District.trim();
    this.apiService.generateCsv(startDate,District).subscribe((responseData: any[]) => {
      // Load the template file

      let columnMappings = {
      'district': 'District',
      'facility_Name': 'Name of Facility',
      'designation':'Designation',
      'reference_ID': 'Reference Id',
      'ppp_ID': 'PPP Id',
      'name_of_Beneficiary': 'Name Of Baneficiary',
      'age_Gender': 'Age / Gender',
      'address': 'Address',
      'diagnosis_Already_Known': 'Diagnosis Already Known',
      'diagnosed': 'Diagnosis',
      'sample_Sent': 'Sample Sent',
      'report_Entered': 'Report Entered',
      'category': 'Category'
    };
   
    console.log(responseData);
      
     // let csvData = this.convertToCSV(responseData, ['district', 'Name of Facility', 'Reference Id', 'PPP Id', 'Name Of Baneficiary','Age / Gender','Address','Diagnosis Already Known','Diagnosis','Sample Sent','Report Entered','Category']);
     let csvData = this.convertToCSV(responseData, ['district', 'facility_Name','designation', 'reference_ID', 'ppp_ID', 'name_of_Beneficiary','age_Gender','address','diagnosis_Already_Known','diagnosed','sample_Sent','report_Entered','category']);
      let blob = new Blob(['\ufeff' + csvData], {
        type: 'text/csv; charset=utf-8;'
      });
      this.DownloadProgLoading=false;
      let dwldLink = document.createElement("a");
      let url = URL.createObjectURL(blob);
      // let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    
      //  If Safari, open in a new window to save the file with a random filename.
      // if (isSafariBrowser) {
      //   dwldLink.setAttribute("target", "_blank");
      // }
      var ReportDate = formatDate(this.Dates.from, 'yyyy-MM-dd', 'en-US');
    
      dwldLink.setAttribute("href", url);
      dwldLink.setAttribute("download", 'Nirogi-Beneficiary-Detailed-Report'+'_'+District+'_'+ReportDate + ".csv");
      dwldLink.style.visibility = "hidden";
      document.body.appendChild(dwldLink);
      dwldLink.click();
      document.body.removeChild(dwldLink);
      
    });
      
  }
  
  

  //working end
  

  onSubmit(){

    //District
    var e = (document.getElementById("District")) as HTMLSelectElement;
    var opt = e.options[e.selectedIndex];
    var District = (<HTMLSelectElement><unknown>opt).innerText;

    //Facility Type
    var e = (document.getElementById("FacilityType")) as HTMLSelectElement;
    var opt = e.options[e.selectedIndex];
    var FacilityType = (<HTMLSelectElement><unknown>opt).innerText;

    //Facility
    var e = (document.getElementById("Facility")) as HTMLSelectElement;
    var opt = e.options[e.selectedIndex];
    var Facility = (<HTMLSelectElement><unknown>opt).innerText;

     //Role
     var e = (document.getElementById("Role")) as HTMLSelectElement;
     var opt = e.options[e.selectedIndex];
     var Role = (<HTMLSelectElement><unknown>opt).innerText;


    
      var uA=new UserAdd();
      uA.firstName=this.myAddUserForm.get("firstName").value.trim();
      uA.lastName=this.myAddUserForm.get("lastName").value.trim();
      uA.username=this.myAddUserForm.get("userName").value.trim();
      uA.password=this.myAddUserForm.get("passWord").value.trim();
      uA.designation=this.myAddUserForm.get("desigNation").value.trim();
      uA.role=Role;
      uA.district=District.trim();
      uA.facilityType=FacilityType.trim();
      uA.facility=Facility.trim();
      uA.mobile=this.myAddUserForm.get("mobile").value.trim();
      uA.email=this.myAddUserForm.get("email").value.trim();
      console.log(uA);

      

      this.users.addUser(uA).subscribe(data=>{
        this.obj=data;
        this.msg = 'User Added Successfully!!';
        window.alert(this.msg);
      },
      (error:any)=>{
        
        alert(error.status+" "+error.error);
        console.log(error);
                   
      }
      );
    
    
  }

  getDistList(){
     this.apiService.getDistrict().subscribe((res:any)=>{
      this.districtNameList=res;
    });
    this.apiService.getFacilityType().subscribe((res:any)=>{
      this.facilityType=res;
    })
  }

  getFacilityList(){
    return this.apiService.getFacility().subscribe((res:any)=>{
      this.facilityNameList=res;
    })
  }

 

  facilityListObj:any;
  showFacilities(){

    //District
    var e = (document.getElementById("District")) as HTMLSelectElement;
    var opt = e.options[e.selectedIndex];
    var District = (<HTMLSelectElement><unknown>opt).value;
    

    //Facility Type
    var e = (document.getElementById("FacilityType")) as HTMLSelectElement;
    var opt = e.options[e.selectedIndex];
    var FacilityType = (<HTMLSelectElement><unknown>opt).innerText;

    var obj=new FacilitySearch();
    obj.dist=District.trim();
    obj.type=FacilityType.trim();

    this.apiService.getFacilityByDistrict(obj).subscribe((facilityRes:any)=>{
      this.facilityListObj=facilityRes;
    })
  }

  

  showList=false;
  valueSelected(e:any){
    if(e.target.value==true){
      this.showList=true;
    }
  }



selectedFile: any = null;
selectedFiles: FileList;
currentFileUpload: File;  
progress: { percentage: number } = { percentage: 0 };

listOfFiles: any[] = [];

selectFile(event: any) {
  this.selectedFiles = event.target.files;
}




upload() {    
  this.progress.percentage = 0;
  this.currentFileUpload = this.selectedFiles.item(0);
  this.DownloadProgLoading=true;
this.apiService.pushFileToStorage(this.currentFileUpload).subscribe({next:event => 
  {
    if (event.type === HttpEventType.UploadProgress) {
      this.progress.percentage = Math.round(100 * event.loaded / event.total);
    } else if (event instanceof HttpResponse) {
       alert('File Successfully Uploaded');
       this.DownloadProgLoading=false;
    }
    this.selectedFiles = undefined;
    this.DownloadProgLoading=false;
    
   },
   error: (err: HttpErrorResponse) => {
    this.DownloadProgLoading=false;
    alert(err.status+err.error);
    console.log(err);
    
  }
}
  );
}

 //report Dates Sent
 Dates={
  from:'',
  to:''
}
Token1=sessionStorage.getItem('token');

DownloadProgLoading=false;


onGo(){
  this.DownloadProgLoading=true;
  //from date 
  var startDate = formatDate(this.Dates.from, 'yyyy-MM-dd', 'en-US');
  
  //To date 
  var endDate =formatDate(this.Dates.to, 'yyyy-MM-dd', 'en-US');

  var obj=new Reports();
  obj.startDate= formatDate(this.Dates.from, 'yyyy-MM-dd', 'en-US');
  obj.endDate=formatDate(this.Dates.to, 'yyyy-MM-dd', 'en-US');
  
  

  this.apiService.getReports(startDate,endDate).subscribe({next:(res:any)=>{
    this.DownloadProgLoading=false;
    this.saveFile(res.body)
  },
  error: (err: HttpErrorResponse) => {
    this.DownloadProgLoading=false;
   alert(err.status+" "+"Could not download the file");
   
 }});

}
private saveFile(response:any){
  var startDate = formatDate(this.Dates.from, 'yyyy-MM-dd', 'en-US');
  
  //To date 
  var endDate =formatDate(this.Dates.to, 'yyyy-MM-dd', 'en-US');

 const blob=new Blob([response],{type:"application/vnd.ms-excel"});
  const d =new Date();
  saveAs(blob,'Cumulative-Detailed-Report'+'_'+startDate+'_To_'+endDate+'.xlsx');


  
}

//reports Dates end

//report section show
detailedReportSection=false;
reportSection=false;

detailedReport(){
  if(this.detailedReportSection==false){
    this.detailedReportSection=true;
    this.reportSection=false;
  }
  else{
    this.detailedReportSection=false;
    this.reportSection=false;
  }
}


report(){
  if(this.reportSection==false){
    this.detailedReportSection=false;
    this.reportSection=true;
  }
  else{
    this.detailedReportSection=false;
    this.reportSection=false;
  }
  
}

}
