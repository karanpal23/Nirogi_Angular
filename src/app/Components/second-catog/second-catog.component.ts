import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllCategoryForm } from 'src/app/classes/AllFormData';
import { SecondCategory } from 'src/app/classes/secondCategory';
import { ApiService } from 'src/app/services/api.service';
import { FormSubmitService } from 'src/app/services/form-submit.service';

@Component({
  selector: 'app-second-catog',
  templateUrl: './second-catog.component.html',
  styleUrls: ['./second-catog.component.css']
})
export class SecondCatogComponent implements OnInit {

diagnosed:string='';
loginUserDistrict=sessionStorage.getItem("district");
loginUserFacility=sessionStorage.getItem("facility");
loginUserFacilityType=sessionStorage.getItem("facilityType");
loginUserFirstname=sessionStorage.getItem("firstname");
loginUserLastname=sessionStorage.getItem("lastname");

anteriorOption:string='';
familyHistory:string='';
currentDate = new Date();
alreadyKnownChecks=false;
selected = 'option2';
selectedOpt: string='';
msg:any;
successfull:string='';
ppp: number;
obj:SecondCategory;
memberId:any;
DoctorName: string;
formFieldsData: FormGroup;

constructor(private router:Router,private formD:FormSubmitService,private apiService:ApiService) {  
}

 dropdownList:any = [];
 selectedItems :any= [];
 dropdownSettings = {};
 requiredField: boolean = false;
 //ends
//pateints details

PPPID:string;
Patientname:string
Age:string;
Gender:string;
MobileNo:string;
Address:string;

//ends
 //diagnosis multi select start

 
 selectedItem: any[];
 displayData:any;
 listDrop:any;
  
  //diagnosis ends

detailsStringData:any=sessionStorage.getItem('navigationExtra');
detailsData=JSON.parse(this.detailsStringData);

ngOnInit(): void {
  this.msg=this.selectedOpt;
  this.ppp=this.msg.pppId;
  this.memberId=this.msg.memberId;

  this.getNationalHealthProgramsList();

    //patient Details start
    sessionStorage.setItem("pppid",this.msg.pppId);
    sessionStorage.setItem("namePatient",this.msg.firstname);
    sessionStorage.setItem("Age",this.msg.age);
    sessionStorage.setItem("gender",this.msg.gender);
    sessionStorage.setItem("mobileNo",this.msg.mobileNo);
    sessionStorage.setItem("address",this.msg.address);

    this.PPPID=sessionStorage.getItem("pppid");
    this.Patientname=sessionStorage.getItem("namePatient");
    this.Age=sessionStorage.getItem("Age");
    this.Gender=sessionStorage.getItem("gender");
    this.MobileNo=sessionStorage.getItem("mobileNo");
    this.Address=sessionStorage.getItem("address");

    //patient details ends

    //diagnosis api
    this.apiService.getDropdownData().subscribe((res:any)=>{
      this.listDrop=res;
      console.log(this.listDrop)
    });

  //lastname null check starts
  if(this.loginUserLastname=="null" || this.loginUserLastname==null || this.loginUserLastname.includes('undefined')){
    this.DoctorName=this.loginUserFirstname;
  }
  else{
    this.DoctorName=this.loginUserFirstname+" "+this.loginUserLastname;
  }
  //lastname null check ends

 //multiselect data 05-06-2023
 this.apiService.getMultiSelectDropdownData().subscribe((res:any)=>{
  this.dropdownList=res;
});

this.dropdownSettings = {
  singleSelection: false,
  idField: 'id',
  textField: 'diseaseList',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  itemsShowLimit: 3,
  allowSearchFilter: true
};
this.setStatus();
 //ends
  

 //input field data 
 this.formFieldsData=new FormGroup({
  deliveryType:new FormControl('' ),
  cryAfterBirth:new FormControl('' ),
  histroyAdmIllness:new FormControl('' ),
  historyFamily:new FormControl('' ),
  familyHistoryIfYes:new FormControl('' ),
  immunStatus:new FormControl('' ),
  historyFeeding:new FormControl('' ),
  contactWithTB:new FormControl('' ),
  historyDeworming:new FormControl('' ),
  neckHolding:new FormControl('' ),
  socialSmile:new FormControl('' ),
  sittingWithSupport:new FormControl('' ),

  //general
  weight:new FormControl('', [Validators.required, Validators.min(5),Validators.max(25), Validators.pattern('^[0-9]*(\.[0-9]+)?$')]),  /**/ 
  height:new FormControl('', [Validators.required, Validators.min(50),Validators.max(130), Validators.pattern('^[0-9]*(\.[0-9]+)?$')]),  /** */
  headCircum:new FormControl('', [Validators.required, Validators.min(30),Validators.max(60), Validators.pattern('^[0-9]*$')]),  /** */
  midArmCircum:new FormControl('',[Validators.required, Validators.min(5),Validators.max(20), Validators.pattern('^[0-9]*$')]),
  oxygenSaturation:new FormControl('', [Validators.required, Validators.min(70),Validators.max(100), Validators.pattern('^[0-9]*$')]),
  pallor:new FormControl('' ),
  jaundice:new FormControl('' ),
  cyanosis:new FormControl('' ),
  heartRate:new FormControl('', [Validators.required, Validators.min(50),Validators.max(200), Validators.pattern('^[0-9]*$')]),
  respiratoryRate:new FormControl('', [Validators.required, Validators.min(25),Validators.max(30), Validators.pattern('^[0-9]*$')]),
  congenitalAnomalies:new FormControl('' ),
  anteriorFontanelle:new FormControl('' ),
  skinLesions:new FormControl('' ),
  chest:new FormControl('' ),
  cvs:new FormControl('' ),
  perAbdomen:new FormControl('' ),
  cns:new FormControl('' ),
  hearing:new FormControl('' ),
  rightEye:new FormControl('',[Validators.required,] ),
  leftEye:new FormControl('',[Validators.required,] ),
  colorBlindness:new FormControl('' ),
  eyeCongenital:new FormControl('' ),
  movementOfEyeBallWithLight:new FormControl('' ),
  hB:new FormControl(''),
  relevantInvestigation:new FormControl(''),

  //diagnosis
  diagnosed:new FormControl('' ),
  alreadyKnown:new FormControl('' ),
  otherDisease:new FormControl(''),

  //prescription
prescription:new FormControl(''),

 });
 //ends

}

selectedBox(e:any){
  if(e.target.checked==true){
    this.alreadyKnownChecks=true;
  }
  else{
    this.alreadyKnownChecks=false;
  }
  
}
//diagnosis starts




//diagnosis ends

submitSuccessfullmsg:string;
getrefId:any;
referenceDivShow=false;
printButton=false;
onSave(){
  this.referenceDivShow=true;
  //delivery type
  var e = (document.getElementById("deliveryType")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var Deliverytype = (<HTMLSelectElement><unknown>opt).innerText;

  //CryAfterBirth
  var e = (document.getElementById("CryAfterBirth")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var cryAfterBirth = (<HTMLSelectElement><unknown>opt).innerText;

  //AnyHistory
  var e = (document.getElementById("PreviousAdmInHospital")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var anyHistoryOfPreviousAdmIllness = (<HTMLSelectElement><unknown>opt).innerText;

  //Significant
  var e = (document.getElementById("FamilyHistory")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var familyHistory = (<HTMLSelectElement><unknown>opt).innerText;
  console.log(familyHistory);

  //Immun
  var e = (document.getElementById("Immunization")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var immunization = (<HTMLSelectElement><unknown>opt).innerText;

  //HIstory feeding

  var e = (document.getElementById("FeedingHistory")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var feedingHistory = (<HTMLSelectElement><unknown>opt).innerText;

  //Contact with Tb
  var e = (document.getElementById("tbContact")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var TbContact = (<HTMLSelectElement><unknown>opt).innerText;

  //neck Holding

  var e = (document.getElementById("historyOfDewarming")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var HistoryOfDewarming = (<HTMLSelectElement><unknown>opt).innerText;

  //Social
  var e = (document.getElementById("sittingWithoutSupport")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var SittingWithoutSupport = (<HTMLSelectElement><unknown>opt).innerText;
  
  //Siting with support
  var e = (document.getElementById("standingWithoutSupport")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var StandingWithoutSupport = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("standingWithSupport")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var StandingWithSupport = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("pincerGrasp")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var PincerGrasp = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("strangerAnxiety")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var StrangerAnxiety = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("bisyllableSpeech")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var BisyllableSpeech = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("walkingWithoutSupport")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var WalkingWithoutSupport = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("speakFiveToTenSupport")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var SpeakFiveToTenSupport = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("followSimpleDirection")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var FollowSimpleDirection = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("walkStairwithSupport")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var WalkStairwithSupport = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("jumpWithBothFeet")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var JumpWithBothFeet = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("scrabbling")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var Scrabbling = (<HTMLSelectElement><unknown>opt).innerText;


  //speakAtleastFiftyWords

  var e = (document.getElementById("speakAtleastFiftyWords")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var SpeakAtleastFiftyWords = (<HTMLSelectElement><unknown>opt).innerText;

  //pallor
  var e = (document.getElementById("pallor")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var Pallor = (<HTMLSelectElement><unknown>opt).innerText;

  //Jaundice
  var e = (document.getElementById("jaundice")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var Jaundice = (<HTMLSelectElement><unknown>opt).innerText;

  //Cyanosis
  var e = (document.getElementById("Cyanosis")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var cyanosis = (<HTMLSelectElement><unknown>opt).innerText;

  //congenital
  var e = (document.getElementById("CongenitalAnomalies")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var congenitalAnomalies = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("pedalOedema")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var PedalOedema = (<HTMLSelectElement><unknown>opt).innerText;

  //Anterior
  var e = (document.getElementById("AnteriorFontanelle")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var anteriorFontanelle = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("hairTexture")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var HairTexture = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("skinTexture")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var SkinTexture = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("skinTurgor")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var SkinTurgor = (<HTMLSelectElement><unknown>opt).innerText;

  //Skin Lesions
  var e = (document.getElementById("SkinLesions")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var skinLesions = (<HTMLSelectElement><unknown>opt).innerText;

  //chest
  var e = (document.getElementById("chest")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var Chest = (<HTMLSelectElement><unknown>opt).innerText;

  //cvs
  var e = (document.getElementById("cvs")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var Cvs = (<HTMLSelectElement><unknown>opt).innerText;

  //per Abdomen
  var e = (document.getElementById("perAbdomen")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var PerAbdomen = (<HTMLSelectElement><unknown>opt).innerText;

  //cns
  var e = (document.getElementById("cns")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var Cns = (<HTMLSelectElement><unknown>opt).innerText;

  //hearing
  var e = (document.getElementById("hearing")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var Hearing = (<HTMLSelectElement><unknown>opt).innerText;

  //eye congenital
  var e = (document.getElementById("colorVision")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var ColorVision = (<HTMLSelectElement><unknown>opt).innerText;

  //movement of eye
  var e = (document.getElementById("dentalExamination")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var DentalExamination = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("reasonForReferValue")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var reasonForReferSelectedVal = (<HTMLSelectElement><unknown>opt).innerText;


  var info=new AllCategoryForm();
  info.patientId=this.detailsData.memberId;
  info.district=this.loginUserDistrict.trim();
  info.facility=(this.loginUserFacilityType+"/"+this.loginUserFacility).trim();
  info.category='2';
  info.createdDate=this.currentDate;
  info.createdBy=this.DoctorName.trim();
  
  info.userId=sessionStorage.getItem('username').trim();
  /*history */

  info.deliveryType=Deliverytype;
  info.cryAfterBirth=cryAfterBirth;
  info.histroyAdmIllness=anyHistoryOfPreviousAdmIllness;
  info.historyFamily=familyHistory;
  info.immunStatus=immunization;
  info.historyFeeding=feedingHistory;
  info.contactWithTB=TbContact;
  info.historyDeworming=HistoryOfDewarming;
  info.sittingWithoutSupport=SittingWithoutSupport;
  info.standingWithoutSupport=StandingWithoutSupport;
  info.standingWithSupport=StandingWithSupport;
  info.pincerGrasp=PincerGrasp;
  info.strangerAnxiety=StrangerAnxiety;
  info.bisyllSpeech=BisyllableSpeech;
  info.walkWithoutSupport=WalkingWithoutSupport;
  info.speakFiveToTenWords=SpeakFiveToTenSupport;
  info.followSimpleDirections=FollowSimpleDirection;
  info.walkStairsWithSupport=WalkStairwithSupport;
  info.jumpWithBothFeets=JumpWithBothFeet;
  info.scrabbling=Scrabbling;
  info.speakAtleastFiftyWords=SpeakAtleastFiftyWords;


  /*general exam */
  info.weight=(this.formFieldsData.get("weight").value);
  info.headCircum=(this.formFieldsData.get("headCircum").value);
  info.height=this.formFieldsData.get("height").value;
  info.midArmCircum=(this.formFieldsData.get("midArmCircum").value);
  info.pallor=Pallor;
  info.jaundice=Jaundice;
  info.cyanosis=cyanosis;
  info.heartRate=(this.formFieldsData.get("heartRate").value);
  info.respiratoryRate=(this.formFieldsData.get("respiratoryRate").value);
  info.oxygenSaturation=(this.formFieldsData.get("oxygenSaturation").value);
  info.pedalOedema=PedalOedema;
  info.congenitalAnomalies=congenitalAnomalies;
  info.anteriorFontanelle=anteriorFontanelle;
  info.hairTexture=HairTexture;
  info.skinTexture=SkinTexture;
  info.skinTurgor=SkinTurgor;
  info.skinLesions=skinLesions;

  /*Systemic */

  info.chest=Chest;
  info.cvs=Cvs;
  info.perAbdomen=PerAbdomen;
  info.cns=Cns;
  info.hearing=Hearing;
  info.rightEye=(this.formFieldsData.get("rightEye").value);
  info.leftEye=(this.formFieldsData.get("leftEye").value);
  info.colorVision=ColorVision;
  info.dentalExaminationAbnormality=DentalExamination;

  /*Mandatory */
  info.hb=(this.formFieldsData.get("hB").value);
  info.relevantInvestigation=this.formFieldsData.get("relevantInvestigation").value;

  //diagnosis


//   let diagnosisValue=String(this.selectedDiseases)+"- "+(this.formFieldsData.get("otherDisease").value);
// if(diagnosisValue=="-" || diagnosisValue==" - " || diagnosisValue=="- "){
//   info.diagnosed="none"
// }else{
//   info.diagnosed=diagnosisValue;
// }

let otherDiseases=(this.formFieldsData.get("otherDisease").value);

if(otherDiseases==" " || otherDiseases==null ){
  info.diagnosed=String(this.selectedDiseases);
}else{
  info.diagnosed=String(this.selectedDiseases)+" - "+otherDiseases;
}

  if(this.alreadyKnownChecks==true){
    info.alreadyKnown="Yes";
  }
  else{
    info.alreadyKnown="No";
  }

//prescription
info.prescription=this.formFieldsData.get("prescription").value;

//reason for refer
info.nHProgValue=this.natHealthProgSelectedValue;
info.reasonForRefer=reasonForReferSelectedVal;

    
console.log(info);
  
this.formD.addFormAllCategory(info).subscribe({next:data=>{
  this.obj=data;
  this.getrefId=data;
  console.log("------------------------------------",this.getrefId.refernceId);
  console.log(this.obj);
  this.submitSuccessfullmsg = "*Patient Information Added Successfully!!";
  window.scrollTo(0,0);
  window.alert(this.submitSuccessfullmsg+" "+" The Reference Id is :- "+data.refernceId);
  this.printButton=true;
},
error: err => {
  // Error response
  if (err.error.includes("Duplicate entry")) {
    console.log("Duplicate entry error:", err.error);
    alert("Duplicate entry error:  "+ err.error);
    // Display the duplicate entry error message to the user or update UI accordingly
  } else {
    console.log("Error:", err.status, err.statusText, err.error);
    alert(" error:  "+ err.status+" "+ err.statusText+" "+ err.error);
    // Display the error message to the user or update UI accordingly
  }
}
// error: (err: HttpErrorResponse) => {
//   alert(err.status+" "+"Something went wrong");  
// }
});
}


onCancel(){
  this.router.navigate(['/']);
}


//multi select 06-06-2023

setStatus() {
  (this.selectedItems.length > 0) ? this.requiredField = true : this.requiredField = false;
}

selectedDiseases:string[]=[];
onItemSelect(item: any) {
  //Do something if required
   // Add the diseaseList value to the selectedDiseases array
  this.selectedDiseases.push(item.diseaseList);
  this.setClass();
}
onItemDeSelect(item: any) {
  // Find the index of the diseaseList value in the selectedDiseases array
  const index = this.selectedDiseases.indexOf(item.diseaseList);
  
  // If the value is found, remove it from the selectedDiseases array
  if (index !== -1) {
    this.selectedDiseases.splice(index, 1);
  }
}
onSelectAll(items: any) {
  
  //Do something if required
  this.setClass();
}

setClass() {
  this.setStatus();
  if (this.selectedItems.length > 0) { return 'validField' }
  else { return 'invalidField' }
}
submission() {
  if (this.requiredField == false) {
    /* Print a message that not all required fields were filled... */
  }
  /* Do form submission... */
}

NationalHealthProgramsList:any;
getNationalHealthProgramsList(){
  this.apiService.getNationalHealthProgramsDropdownData().subscribe((res:any)=>{
    this.NationalHealthProgramsList=res;
  });
}
natHealthProgSelectedValue:any;
getNatHelProg(obj:any){
  const selectedValue = obj.target.value;
 this.natHealthProgSelectedValue=selectedValue;
  console.log("--"+this.natHealthProgSelectedValue);
}


reasonForReferSelectedValue:any;
getReasonForRefer(){
  var e = (document.getElementById("reasonForReferValue")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  this.reasonForReferSelectedValue = (<HTMLSelectElement><unknown>opt).innerText;
  console.log(this.reasonForReferSelectedValue);
}


}
