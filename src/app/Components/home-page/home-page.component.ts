import { Component, OnInit, VERSION, ViewChild } from '@angular/core';

import { NavigationExtras, Router } from '@angular/router';


import { Posts } from 'src/app/classes/post';
import { MemberServiceService } from 'src/app/services/member-service.service';
import { ApiService } from 'src/app/services/api.service';
import { ReferenceId } from 'src/app/classes/referenceId';
import {  formatDate } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
import {TranslateService} from "@ngx-translate/core";
import { CalculateAgePipeService } from 'src/app/services/calculate-age-pipe.service';
import { PppSearchedResponse } from 'src/app/classes/PppSearchedResponse';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';
import { addNewPppMembers } from 'src/app/classes/addNewPppMember';



            
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit
{


  //new member code
  userId=sessionStorage.getItem('username');
  newPppMemberFields: FormGroup;
  newMemberAddRecord={
    firstname:'',
    lastname:'',
    headOfFamily:'',
    pppId:'',
    gender:'',
    mobileNo:'',
    dateOfBirth:'',
    relationshipWithHeadOfFamily:'',
    memberId:''
  }

  showInputRow: boolean = false;
  showInputRowBackbutton: boolean = false;
  showInputRowbutton: boolean = true;


  onAddNewMember() {
    this.showInputRow = true;
    this.showInputRowBackbutton = true;
    this.showInputRowbutton=false;
  }

  onInputRowBackbutton(){
    this.showInputRow = false;
    this.showInputRowBackbutton = false;
    this.showInputRowbutton=true;
  }
  // Function to handle the "Add" button click event in add new member
  onAddButtonClick(obj:any) {

    var e = (document.getElementById("selectOptionRelWithHod")) as HTMLSelectElement;
    var opt = e.options[e.selectedIndex];
    var SelectOptionRelWithHod = (<HTMLSelectElement><unknown>opt).innerText;

    
    var data=new addNewPppMembers();
    data.pppId=(obj.pppId);
    data.firstname=this.newMemberAddRecord.firstname;
    data.lastname=this.newMemberAddRecord.lastname;
   
    data.dateOfBirth=this.newMemberAddRecord.dateOfBirth;
    data.gender=this.newMemberAddRecord.gender;
    data.mobileNo=this.newMemberAddRecord.mobileNo;
    data.relationshipWithHeadOfFamily=SelectOptionRelWithHod;

    if(obj.headOfFamily!=null && obj.headOfFamily!=''){
    data.headOfFamily=obj.headOfFamily;
    }
    else{
      data.headOfFamily=obj.fatherHusbandFirstname+" "+obj.fatherHusbandLastname;
    }

    console.log("data-- "+JSON.stringify(data))
    try {
      this.memberService.addNewPppMember(data).subscribe((res:any)=>{
        console.log("refresh by again searching after adding member");
       this.getMemberByPpp(obj.pppId);
        console.log(res);
      })
      
    } catch (error) {
      console.log(error)
    }
    
    this.showInputRow = false;
    this.showInputRowBackbutton = false;
    this.showInputRowbutton=true;
    
  }

  

  //end

  tempValue:any;
  objPosts: Posts[];
  pppIdInput:any; 
  selectedOpt: any;
  loginUserData: any;
  morefilter=false;

  districtNameList:any;
  tableDisplay=false;
  spinner=false;
  logoDisplay=true;
  patientAge:any;

  calculateAgePipe = new CalculateAgePipeService();

  UserName=sessionStorage.getItem("firstname");

  referenceObj:ReferenceId[];
  /*submittion */
 
  loginUserDistrict=sessionStorage.getItem("district");
  loginUserFacility=sessionStorage.getItem("facility");
  loginUserDist=sessionStorage.getItem("district");
  loginUserFirstname=sessionStorage.getItem("firstname");
  loginUserLastname=sessionStorage.getItem("lastname");

  mobField=true;
  fName=true;

  DoctorName:string;


  objRef={
    referenceId:''
  }
//list according to fields
  memberSearch={
    district: this.loginUserDistrict,
    pppId:"",
    mobileNo:'',
    firstname:'',
  };
  objSerch:Posts[];
   searchObjField:any;
   tag=1;
  refTableDisplay: boolean=false;
  name = 'Angular ' + VERSION.major;
  constructor(private router:Router,private memberService:MemberServiceService, private apiService:ApiService,private fb: FormBuilder) {
    
  }
 

  memberHistoryOfExamin={
    pppId:'',
    firstname:'',
    memberId:'',
    lastname:'',
    fatherHusbandFirstname:'',
    fatherHusbandLastname:'',
    blockTownCity:'',
    wardVillage:'',
    district:'',
    income:'',
    age:'',
    gender:'',
    mobileNo:'',
    address:'',
    userFacility: '',
    userDistrict:'',
    flagCheck:''
  };
 
  memberDataObj={
    'memberId':''
  };

  isShowDivIf = false;  
    
  toggleDisplayDivIf() {  
    this.isShowDivIf = !this.isShowDivIf;  
  }  

  ngOnInit(){

    this.getPendingReportCount(this.userId);
    this.selectedOpt=sessionStorage.getItem('loginResponse');
    this.getDistList();
    this.loginUserData=this.selectedOpt;
    this.tag=0;

    if(this.loginUserLastname=="null" || this.loginUserLastname==null){
      this.DoctorName=this.loginUserFirstname;
    }
    else{
      this.DoctorName=this.loginUserFirstname+" "+this.loginUserLastname;
    }

    //new ppp member add code

    this.newPppMemberFields=this.fb.group({
      pppId:[''],
      firstname:[''],
      lastname:[''],
      dob:[''],
      gender:[''],
      mobileNumber:[''],
      relwithHeadOfFamily:['']
    });
  }

  getAll(){
    this.memberService.getMembers().subscribe((response:any)=>{
      this.objPosts=response;
      }
      );
  }

  //home search button
  getMember(){
    this.memberService.getSeachedMember(this.searchObjField).subscribe((res:any)=>{
      this.objSerch=res
    });
  }

  getMemberByPpp(obj:any){
    if(obj!=null && obj!='')
    {
      this.logoDisplay=false;
      this.spinner=true;
      this.tableDisplay=true;
      this.refTableDisplay=false;

      this.searchObjField=new PppSearchedResponse();
      this.searchObjField.pppId=obj;
      this.memberService.getSeachedMember(this.searchObjField).subscribe({next:(res:any)=>{
        this.spinner=false;
        this.objSerch=res;
        console.log(JSON.stringify(res))
        this.memberHistoryOfExamin=(res);
      },
      error: (err: HttpErrorResponse) => {
        this.spinner=false;
       alert(err.status+"Something went wrong");
       console.log(err.status+" "+err.error);
       
     }});
    }
    else{
      window.alert("enter valid ppp id");
    }
  }


  
  
  

  getMemberByMob(){
    
    var e = (document.getElementById("District")) as HTMLSelectElement;
    var opt = e.options[e.selectedIndex];
    var SelectedDistrict = (<HTMLSelectElement><unknown>opt).innerText;

    SelectedDistrict=SelectedDistrict.toUpperCase().trim();

    this.searchObjField=new Posts();

    if((this.memberSearch.mobileNo!='' && this.memberSearch.firstname!='' && SelectedDistrict!='') && (this.memberSearch.mobileNo!=null && this.memberSearch.firstname!=null && SelectedDistrict!=null))
    {
      this.logoDisplay=false;
      this.spinner=true;
      this.tableDisplay=true;
      this.searchObjField.district=SelectedDistrict;
      this.searchObjField.mobileNo=this.memberSearch.mobileNo;
      this.searchObjField.firstname=this.memberSearch.firstname;
      this.memberService.getSeachedMemberByDist(this.searchObjField).subscribe((res:any)=>{
        
        this.objSerch=res
        this.spinner=false;
      });
      
    
    }
    else{
        this.mobField=false
    }


    
  }
 
  pppInput(val:string)

  {
    return this.pppIdInput=val; 
  } 


 
//home to next selected form
  onNext(selectedMember: Posts, memberId:any) {
    let aGe=selectedMember.age;
    var data1=new Posts();
    data1.pppId=selectedMember.pppId;
    data1.memberId=memberId;
    data1.userDistrict=this.loginUserDistrict;
    data1.userFacility=this.loginUserFacility;
    data1.firstname=selectedMember.firstname;
    data1.lastname=selectedMember.lastname;
    data1.fatherHusbandFirstname=selectedMember.fatherHusbandFirstname;
    data1.fatherHusbandLastname=selectedMember.fatherHusbandLastname;
    data1.blockTownCity=selectedMember.blockTownCity;
    data1.wardVillage=selectedMember.wardVillage;
    data1.district=selectedMember.district;
    data1.income=selectedMember.income;
    data1.age=selectedMember.age;
    data1.dateOfBirth=selectedMember.dateOfBirth;
    data1.gender=selectedMember.gender;
    data1.mobileNo=selectedMember.mobileNo;
    data1.address=selectedMember.address;
    
    if(selectedMember.dateOfBirth==null || selectedMember.dateOfBirth==''){
        sessionStorage.setItem('navigationExtra',JSON.stringify(data1));
      if(aGe<1){
        this.router.navigate(['Category I (0-6 months)']);

      }
      else if(aGe>=1 && aGe<=5){
        this.router.navigate(['Category II (6-59 months)']);
      }
      else if(aGe>5 && aGe<=18){
        this.router.navigate(['Category III (5-18 years)']);
      }
      else if(aGe>18 && aGe<=40){
        this.router.navigate(['Category IV (18-40 years)']);
      }
      else if(aGe>40 && aGe<=60){
        this.router.navigate(['Category V (40-60 years)']);
      }
      else{
        this.router.navigate(['Category VI (Over 60 years)'])
      }
    }
    else{
      let patientAge= Number(this.calculateAgePipe.transform(selectedMember.dateOfBirth));
      sessionStorage.setItem('navigationExtra',JSON.stringify(data1));
      if(patientAge<1){
        this.router.navigate(['Category I (0-6 months)']);

      }
      else if(patientAge>=1 && patientAge<=5){
        this.router.navigate(['Category II (6-59 months)']);
      }
      else if(patientAge>5 && patientAge<=18){
        this.router.navigate(['Category III (5-18 years)']);
      }
      else if(patientAge>18 && patientAge<=40){
        this.router.navigate(['Category IV (18-40 years)']);
      }
      else if(patientAge>40 && patientAge<=60){
        this.router.navigate(['Category V (40-60 years)']);
      }
      else{
        this.router.navigate(['Category VI (Over 60 years)'])
      }

    }
    
   
}

//home to next selected form to view 
onView(selectedMember: Posts, memberId:any) {
  let aGe=selectedMember.age;
  var data1=new Posts();
  data1.pppId=selectedMember.pppId;
  data1.memberId=memberId;
  data1.userDistrict=this.loginUserDistrict;
  data1.userFacility=this.loginUserFacility;
  data1.firstname=selectedMember.firstname;
  data1.lastname=selectedMember.lastname;
  data1.fatherHusbandFirstname=selectedMember.fatherHusbandFirstname;
  data1.fatherHusbandLastname=selectedMember.fatherHusbandLastname;
  data1.blockTownCity=selectedMember.blockTownCity;
  data1.wardVillage=selectedMember.wardVillage;
  data1.district=selectedMember.district;
  data1.income=selectedMember.income;
  data1.age=selectedMember.age;
  data1.gender=selectedMember.gender;
  data1.mobileNo=selectedMember.mobileNo;
  data1.address=selectedMember.address;
  data1.viewFlag="yes"

  
  sessionStorage.setItem('navigationExtra',JSON.stringify(data1));
  if(selectedMember.dateOfBirth==null || selectedMember.dateOfBirth==''){
    sessionStorage.setItem('navigationExtra',JSON.stringify(data1));
  if(aGe<1){
    this.router.navigate(['Category-I (0-6 months)-Preview']);

  }
  else if(aGe>=1 && aGe<=5){
    this.router.navigate(['Category-II (6-59 months)-Preview']);
  }
  else if(aGe>5 && aGe<=18){
    this.router.navigate(['Category-III (5-18 years)-Preview']);
  }
  else if(aGe>18 && aGe<=40){
    this.router.navigate(['Category-IV (18-40 years)-Preview']);
  }
  else if(aGe>40 && aGe<=60){
    this.router.navigate(['Category-V (40-60 years)-Preview']);
  }
  else{
    this.router.navigate(['Category-VI (Over 60 years)-Preview'])
  }
}
else{
  let patientAge= Number(this.calculateAgePipe.transform(selectedMember.dateOfBirth));
  sessionStorage.setItem('navigationExtra',JSON.stringify(data1));
  if(patientAge<1){
    this.router.navigate(['Category-I (0-6 months)-Preview']);

  }
  else if(patientAge>=1 && patientAge<=5){
    this.router.navigate(['Category-II (6-59 months)-Preview']);
  }
  else if(patientAge>5 && patientAge<=18){
    this.router.navigate(['Category-III (5-18 years)-Preview']);
  }
  else if(patientAge>18 && patientAge<=40){
    this.router.navigate(['Category-IV (18-40 years)-Preview']);
  }
  else if(patientAge>40 && patientAge<=60){
    this.router.navigate(['Category-V (40-60 years)-Preview']);
  }
  else{
    this.router.navigate(['Category-VI (Over 60 years)-Preview'])
  }

}
}

refId(ref:any)
{
  if(ref!='' && ref!=null){
    this.logoDisplay=false;
    this.spinner=true;
    this.refTableDisplay=true;
    this.tableDisplay=false;
  let  hist=new ReferenceId();
  let  gen:any;
  let  sys:any;

    this.objRef.referenceId=ref;
    this.apiService.getHistoryRefIdData(this.objRef).subscribe((res:any)=>{
      this.spinner=false;
      this.referenceObj=res;
  }
    );
    //general
    gen=this.apiService.getGeneralRefIdData(this.objRef).subscribe((res:any)=>{
      this.spinner=false;
      this.referenceObj=res;
    });
    
    //systemic
    sys=this.apiService.getSystemicRefIdData(this.objRef).subscribe((res:any)=>{
      this.spinner=false;
      this.referenceObj=res;
    });


    return (hist+sys+gen);

  }
  else{
    window.alert("enter valid ref id");
  }

}

getDistList(){
  return this.apiService.getDistrict().subscribe((res:any)=>{
    this.districtNameList=res;
  })
}


onNextRef(ref:ReferenceId){
  var data1=new ReferenceId();
  data1.patientId=ref.patientId;
  data1.referenceId=ref.referenceId;
  data1.district=ref.district;
  data1.facility=ref.facility;
  data1.referenceId=ref.referenceId;
  data1.createdBy=ref.createdBy;
  data1.viewFlag="no"
  

  var dataMember=new Posts();
  dataMember.memberId=ref.patientId;
  this.memberService.getMemberData(dataMember).subscribe((res:any)=>{
    
    this.objSerch=res;
    
  });

    sessionStorage.setItem('navigationExtra',JSON.stringify(data1));

  if(ref.category=='1'){
    this.router.navigate(['Category-I (0-6 months)']);
  }
  else if(ref.category=='2'){
    this.router.navigate(['Category-II (6-59 months)']);

  }
  else if(ref.category=='3'){
    this.router.navigate(['Category-III (5-18 years)']);

  }
  else if(ref.category=='4'){
    this.router.navigate(['Category-IV (18-40 years)']);

  }
  else if(ref.category=='5'){
    this.router.navigate(['Category-V (40-60 years)']);

  }
  else{
    
    this.router.navigate(['Category-VI (Over 60 years)'])
  }


}


onNextRefView(ref:any){
  var data1=new ReferenceId();
  data1.patientId=ref.patientId;
  data1.referenceId=ref.referenceId;
  data1.district=ref.district;
  data1.facility=ref.facility;
  data1.referenceId=ref.referenceId;
  data1.createdBy=ref.createdBy;
  data1.viewFlag="no"
  

  var dataMember=new Posts();
  dataMember.memberId=ref.patientId;
  this.memberService.getMemberData(dataMember).subscribe((res:any)=>{
    
    this.objSerch=res;
    
  });

    sessionStorage.setItem('navigationExtra',JSON.stringify(data1));

  if(ref.category=='1'){
    this.router.navigate(['Category-I (0-6 months)-Preview']);
  }
  else if(ref.category=='2'){
    this.router.navigate(['Category-II (6-59 months)-Preview']);

  }
  else if(ref.category=='3'){
    this.router.navigate(['Category-III (5-18 years)-Preview']);

  }
  else if(ref.category=='4'){
    this.router.navigate(['Category-IV (18-40 years)-Preview']);

  }
  else if(ref.category=='5'){
    this.router.navigate(['Category-V (40-60 years)-Preview']);

  }
  else{
    
    this.router.navigate(['Category-VI (Over 60 years)-Preview'])
  }


}


//category 1 mandatory investigation  start
cat1SectionShow=false;

//category 2 mandatory investigation  start
cat2SectionShow=false;

//category 3 mandatory investigation  start
cat3SectionShow=false;

//category 4 mandatory investigation  start
cat4SectionShow=false;

//category 5 mandatory investigation  start
cat5SectionShow=false;

//category 6 mandatory investigation  start
cat6SectionShow=false;


//reference id search 
searchByReferenceId(age:any){
    if(age<10){
      this.cat1SectionShow=true;
    }
    else if(age>10 && age<20){
      this.cat2SectionShow=true;
    }
    else if(age>20 && age<30){
      this.cat3SectionShow=true;
    }
    else if(age>30 && age<40){
      this.cat4SectionShow=true;
    }
    else if(age>40 && age<45){
      this.cat5SectionShow=true;
    }
    else(age>45)
    this.cat6SectionShow=true;
  }
  
//reports download
  reportsTableDisplay=false;


  
  reportTable(){
    this.logoDisplay=false;
    //this.spinner=true;
    this.refTableDisplay=false;
    this.tableDisplay=false;
    if(this.reportsTableDisplay==true){
      this.reportsTableDisplay=false;
    }
    else{
      this.reportsTableDisplay=true;
    }
    
  }

  //report Dates Sent
  Dates={
    from:'',
    to:''
  }
  Token1=sessionStorage.getItem('token');


// Nirogi-Beneficiary-Detailed-Report starts



  
// }
private saveFirstFile(response:any){
  var e = (document.getElementById("DistrictName")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var District = (<HTMLSelectElement><unknown>opt).innerText;
  District=District.trim();

  var ReportDate = formatDate(this.Dates.from, 'yyyy-MM-dd', 'en-US');
  const blob=new Blob([response],{type:"application/vnd.ms-excel"});
  const d =new Date();
  saveAs(blob,'Nirogi-Beneficiary-Detailed-Report'+'_'+District+'_'+ReportDate+'.xlsx'); 
}
// Nirogi-Beneficiary-Detailed-Report ends

  //flag check

  flag(obj:any){
    if(obj=="yes"){
      return true;
    }
    return false;
  }




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
    this.spinner=true;
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
   
   
      
     // let csvData = this.convertToCSV(responseData, ['district', 'Name of Facility', 'Reference Id', 'PPP Id', 'Name Of Baneficiary','Age / Gender','Address','Diagnosis Already Known','Diagnosis','Sample Sent','Report Entered','Category']);
     let csvData = this.convertToCSV(responseData, ['district', 'facility_Name','designation', 'reference_ID', 'ppp_ID', 'name_of_Beneficiary','age_Gender','address','diagnosis_Already_Known','diagnosed','sample_Sent','report_Entered','category']);
      let blob = new Blob(['\ufeff' + csvData], {
        type: 'text/csv; charset=utf-8;'
      });
      this.spinner=false;
      let dwldLink = document.createElement("a");
      let url = URL.createObjectURL(blob);
      
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

  //user count 
   PendingReportsCount:any;
   getPendingReportCount(obj:any){
    console.log("userId-- "+this.userId)
    this.memberService.getPendingRecordCount(obj).subscribe((res:any)=>{
      console.log("inside ")
      this.PendingReportsCount=res;
      console.log("count--- "+res);

    })
   }
  
   

}

