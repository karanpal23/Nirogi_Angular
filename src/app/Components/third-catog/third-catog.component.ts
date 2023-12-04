import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllCategoryForm } from 'src/app/classes/AllFormData';
import { OrderedLabTests } from 'src/app/classes/OrderedLabTests';
import { ThirdCategory } from 'src/app/classes/ThirdCategory';
import { ApiService } from 'src/app/services/api.service';
import { FormSubmitService } from 'src/app/services/form-submit.service';
import html2pdf from 'html2pdf.js';


interface FormField {
  id: string;
  label: string;
  checked: boolean;
  value: number;
  minValue: number;
  maxValue: number;
}
@Component({
  selector: 'app-third-catog',
  templateUrl: './third-catog.component.html',
  styleUrls: ['./third-catog.component.css']
})

export class ThirdCatogComponent implements OnInit {

  //new code for mandatory field validation


  //ends here 

  //multiselect code 05-06-2023

  dropdownList:any = [];
  selectedItems :any= [];
  dropdownSettings = {};
  requiredField: boolean = false;
  formFieldsData: FormGroup;
  //ends

  constructor(private router:Router, private formD:FormSubmitService,private fb: FormBuilder,private apiService:ApiService) {
    //checked value
    this.checkedValue=this.fb.group({
      selectAll:[false],
      hBChecks: [false],
      tlcChecks:[false],
      dlcChecks:[false],
      neutrophilsChecks:[false],
      lymphocytesChecks:[false],
      monocytesChecks:[false],
      eosinophilsChecks:[false],
      basophilsChecks:[false],
      packedCellVolumeChecks:[false],
      meanCorpusVolumeChecks:[false],
      meanCorpusHemoglobinChecks:[false],
      meanCorpusHemoglobinConcenChecks:[false],
      pletletCountChecks:[false],
      rdwCvChecks:[false],
      rdwSdChecks:[false],
      rbcCountChecks:[false],
      rbsChecks:[false],
      urineRoutineExaminationChecks:[false],
      relevantInvestigationChecks:[false],


      //input fields value
      hB:'',
      tlc:'',
      dlc:'',
      neutrophils:'',
      lymphocytes:'',
      monocytes:'',
      eosinophils:'',
      basophils:'',
      packedCellVolume:'',
      meanCorpusVolume:'',
      meanCorpusHemoglobin:'',
      meanCorpusHemoglobinConcen:'',
      pletletCount:'',
      rdwCv:'',
      rdwSd:'',
      rbcCount:'',
      rbs:'',
      urineRoutineExamination:'',
      relevantInvestigation:'',

      diagnosedValue:''

    });


  }


  form= {
    patientId:'',
    districtName:'',
    facilityName:'',
    histroyAdmIllness:'',
    historyFamily:'',
    immunStatus:'',
    contactWithTB:'',
    historyDeworming:'',
    weight:'',  /**/ 
    height:'',  /** */
    bmi:'',  /** */
    bloodPressure:'',
    pedalOedema:'',
    pallor:'',
    jaundice:'',
    cyanosis:'',
    pulseRate:'',
    respiratoryRate:'',
    
    chest:'',
    cvs:'',
    perAbdomen:'',
    cns:'',
    hearing:'',
    rightEye:'',
    leftEye:'',
    genitalExamination:'',
    hB:'',
    tlc:'',
    dlc:'',
    neutrophils:'',
    lymphocytes:'',
    monocytes:'',
    eosinophils:'',
    basophils:'',
    packedCellVolume:'',
    meanCorpusVolume:'',
    meanCorpusHemoglobin:'',
    meanCorpusHemoglobinConcen:'',
    pletletCount:'',
    rdwCv:'',
    rdwSd:'',
    rbcCount:'',
    rbs:'',
    urineRoutineExamination:'',
    relevantInvestigation:'',
    alreadyKnown:'',

    //prescription
	prescription:''

  };

  msg:any;
  obj:ThirdCategory;
  ppp:any;
  loginUserDistrict=sessionStorage.getItem("district");
  loginUserFacility=sessionStorage.getItem("facility");
  loginUserFacilityType=sessionStorage.getItem("facilityType");
  loginUserFirstname=sessionStorage.getItem("firstname");
  loginUserLastname=sessionStorage.getItem("lastname");
  currentDate = new Date();
  calculatedBmi:any;

  //after clicked on check box
  checkedValue:FormGroup;
  
  successfull: string;
  memberId: any;
  checks=false;
  alreadyKnownChecks: boolean;
  DoctorName: string;

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
    this.msg=this.detailsData;
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

     //diagnosis api

    //lastname null check starts
    if(this.loginUserLastname=="null" || this.loginUserLastname==null || this.loginUserLastname.includes('undefined')){
      this.DoctorName=this.loginUserFirstname;
    }
    else{
      this.DoctorName=this.loginUserFirstname+" "+this.loginUserLastname;
    }
    //lastname null check ends

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
  weight:new FormControl('', [Validators.required, Validators.min(5),Validators.max(120), Validators.pattern('^[0-9]*(\.[0-9]+)?$')]),  /**/ 
  height:new FormControl('', [Validators.required, Validators.min(90),Validators.max(215), Validators.pattern('^[0-9]*(\.[0-9]+)?$')]),  /** */
  headCircum:new FormControl(''),  /** */
  midArmCircum:new FormControl(''),
  oxygenSaturation:new FormControl(''),
  pulseRate:new FormControl('', [Validators.required, Validators.min(30),Validators.max(250), Validators.pattern('^[0-9]*$')]),
  pallor:new FormControl('' ),
  jaundice:new FormControl('' ),
  cyanosis:new FormControl('' ),
  bloodPressure:new FormControl('', [Validators.required,  Validators.pattern('^[0-9]+\/[0-9]+$')]),
  bmi:new FormControl(''),
  respiratoryRate:new FormControl('', [Validators.required, Validators.min(5),Validators.max(30), Validators.pattern('^[0-9]*$')]),
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

  //mandatory
  hb:new FormControl('', [ Validators.max(14), Validators.pattern('^[0-9]*$')]),

  //diagnosis
  diagnosed:new FormControl('' ),
  alreadyKnown:new FormControl('' ),
  otherDisease:new FormControl(''),

  //checks
  

  //prescription
prescription:new FormControl(''),

 });
 //ends

  }

  
  //diagnosis starts

  
  //diagnosis ends

  test() {
    
    console.log(this.checkedValue.value);
    console.log(this.checkedValue.value.tlc);
    console.log(this.checkedValue.value.hB,"******************");
    console.log(this.checkedValue.value.dlc);
  }
  //calculate emi
  weightValue:any;
  heightValue:any;
  calculateBmi(){
    //calculate bmi
      this.heightValue=Number(this.formFieldsData.get("height").value)/100;
     this.calculatedBmi=((this.formFieldsData.get("weight").value)/((this.heightValue)*(this.heightValue))).toFixed(2);
   
  }


submitSuccessfullmsg:string;
getrefId:any;
referenceDivShow=false;
printButton=false;





//checkbox 


onSave(){

  this.referenceDivShow=true;
  //AnyHistory
  var e = (document.getElementById("PreviousAdmInHospital")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var anyHistoryOfPreviousAdmIllness = (<HTMLSelectElement><unknown>opt).innerText;

  //Significant
  var e = (document.getElementById("FamilyHistory")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var familyHistory = (<HTMLSelectElement><unknown>opt).innerText;
  

  //Immun
  var e = (document.getElementById("Immunization")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var immunization = (<HTMLSelectElement><unknown>opt).innerText;

  //Contact with Tb
  var e = (document.getElementById("tbContact")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var TbContact = (<HTMLSelectElement><unknown>opt).innerText;

  //history Of Dewarming

  var e = (document.getElementById("historyOfDewarming")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var HistoryOfDewarming = (<HTMLSelectElement><unknown>opt).innerText;

  
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

  var e = (document.getElementById("skinTurgor")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var SkinTurgor = (<HTMLSelectElement><unknown>opt).innerText;

  //Skin Lesions
  var e = (document.getElementById("SkinLesions")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var skinLesions = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("wristWidening")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var WristWidening = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("vitA")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var VitA = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("gonadalExam")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var GonadalExam = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("earDischarge")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var EarDischarge = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("speech")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var Speech = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("iq")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var Iq = (<HTMLSelectElement><unknown>opt).innerText;


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
  
  
  var e = (document.getElementById("genitalExamination")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var GenitalExamination = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("reasonForReferValue")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var reasonForReferSelectedVal = (<HTMLSelectElement><unknown>opt).innerText;



var info=new AllCategoryForm();
info.patientId=this.detailsData.memberId;
info.district=this.loginUserDistrict.trim();
info.facility=(this.loginUserFacilityType+"/"+this.loginUserFacility).trim();
info.category='3';
info.createdDate=this.currentDate;
info.createdBy=this.DoctorName.trim();

info.userId=sessionStorage.getItem('username').trim();
/*history */

info.histroyAdmIllness=anyHistoryOfPreviousAdmIllness;
info.historyFamily=familyHistory;
info.immunStatus=immunization;
info.contactWithTB=TbContact;
info.historyDeworming=HistoryOfDewarming;



/*general exam */

info.weight=(this.formFieldsData.get("weight").value);
info.height=(this.formFieldsData.get("height").value);
info.bmi=this.calculatedBmi;
info.pallor=Pallor;
info.jaundice=Jaundice;
info.cyanosis=cyanosis;
info.pulseRate=(this.formFieldsData.get("pulseRate").value);
info.respiratoryRate=(this.formFieldsData.get("respiratoryRate").value);
info.bloodPressure=(this.formFieldsData.get("bloodPressure").value);
info.pedalOedema=PedalOedema;
info.congenitalAnomalies=congenitalAnomalies;
info.skinTurgor=SkinTurgor;
info.skinLesions=skinLesions;
info.wristWidening=WristWidening;
info.vitADeficiency=VitA;
info.gonadalExamination=GonadalExam;
info.earDischarge=EarDischarge;
info.speech=Speech;
info.iq=Iq;

/*Systemic */

info.chest=Chest;
info.cvs=Cvs;
info.perAbdomen=PerAbdomen;
info.cns=Cns;
info.hearing=Hearing;
info.rightEye=this.formFieldsData.get("rightEye").value;
info.leftEye=this.formFieldsData.get("leftEye").value;
info.colorVision=ColorVision;
info.dentalExaminationAbnormality=DentalExamination;
info.genitalExamination=GenitalExamination;

/*Mandatory */

info.hb=this.checkedValue.value.hB;
info.tlc=this.checkedValue.value.tlc;
info.neutrophils=this.checkedValue.value.neutrophils;
info.lymphocytes=this.checkedValue.value.lymphocytes;
info.monocytes=this.checkedValue.value.monocytes;
info.eosinophils=this.checkedValue.value.eosinophils;
info.basophils=this.checkedValue.value.basophils;
info.packedCellVolume=this.checkedValue.value.packedCellVolume;
info.meanCorpusVolume=this.checkedValue.value.meanCorpusVolume;
info.meanCorpusHemoglobin=this.checkedValue.value.meanCorpusHemoglobin;
info.meanCorpusHemoglobinConcentration=this.checkedValue.value.meanCorpusHemoglobinConcen;
info.platletCount=this.checkedValue.value.pletletCount;
info.rdwCv=this.checkedValue.value.rdwCv;
info.rdwSd=this.checkedValue.value.rdwSd;
info.rbs=this.checkedValue.value.rbs;
info.urineRoutineExamination=this.checkedValue.value.urineRoutineExamination;
info.relevantInvestigation=this.checkedValue.value.relevantInvestigation;

//diagnosis

// let diagnosisValue=String(this.selectedDiseases)+"- "+(this.formFieldsData.get("otherDisease").value);
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

//checks for lab tests sent

if (this.checkedValue.value.selectAll) {
  info.hbChecks = "sent";
  info.relevantInvestigationChecks = "sent";
  info.rbsChecks = "sent";
  info.urineRoutineExamChecks = "sent";
  info.serumCholesterolChecks = "sent";
  info.rftChecks = "sent";
  info.tshChecks = "sent";
  info.psaChecks = "sent";
  info.rdwCvChecks = "sent";
  info.tlcChecks = "sent";
  info.neutrophilsChecks = "sent";
  info.lymphocytesChecks = "sent";
  info.monocytesChecks = "sent";
  info.eosinophilsChecks = "sent";
  info.basophilsChecks = "sent";
  info.packedCellVolumeChecks = "sent";
  info.meanCorpuscularVolumeChecks = "sent";
  info.meanCorpuscularHemoglobinChecks = "sent";
  info.meanCorpuscularHemoglobinConcentrationChecks = "sent";
  info.pleteletChecks = "sent";
  info.rdwSdChecks = "sent";
  info.rbcChecks = "sent";
  info.bloodUreaChecks = "sent";
  info.serumCreatinineChecks = "sent";
  info.papSmaearChecks = "sent";
  console.log("checks  -   "+info);
} else {
  info.hbChecks = this.checkedValue.value.hbChecks ? "sent" : "not sent";
  info.relevantInvestigationChecks = this.checkedValue.value.relevantInvestigationChecks ? "sent" : "not sent";
  info.rbsChecks = this.checkedValue.value.rbsChecks ? "sent" : "not sent";
  info.urineRoutineExamChecks = this.checkedValue.value.urineRoutineExamChecks ? "sent" : "not sent";
  info.serumCholesterolChecks = this.checkedValue.value.serumCholesterolChecks ? "sent" : "not sent";
  info.rftChecks = this.checkedValue.value.rftChecks ? "sent" : "not sent";
  info.tshChecks = this.checkedValue.value.tshChecks ? "sent" : "not sent";
  info.psaChecks = this.checkedValue.value.psaChecks ? "sent" : "not sent";
  info.rdwCvChecks = this.checkedValue.value.rdwCvChecks ? "sent" : "not sent";
  info.tlcChecks = this.checkedValue.value.tlcChecks ? "sent" : "not sent";
  info.neutrophilsChecks = this.checkedValue.value.neutrophilsChecks ? "sent" : "not sent";
  info.lymphocytesChecks = this.checkedValue.value.lymphocytesChecks ? "sent" : "not sent";
  info.monocytesChecks = this.checkedValue.value.monocytesChecks ? "sent" : "not sent";
  info.eosinophilsChecks = this.checkedValue.value.eosinophilsChecks ? "sent" : "not sent";
  info.basophilsChecks = this.checkedValue.value.basophilsChecks ? "sent" : "not sent";
  info.packedCellVolumeChecks = this.checkedValue.value.packedCellVolumeChecks ? "sent" : "not sent";
  info.meanCorpuscularVolumeChecks = this.checkedValue.value.meanCorpuscularVolumeChecks ? "sent" : "not sent";
  info.meanCorpuscularHemoglobinChecks = this.checkedValue.value.meanCorpuscularHemoglobinChecks ? "sent" : "not sent";
  info.meanCorpuscularHemoglobinConcentrationChecks = this.checkedValue.value.meanCorpuscularHemoglobinConcentrationChecks ? "sent" : "not sent";
  info.pleteletChecks = this.checkedValue.value.pleteletChecks ? "sent" : "not sent";
  info.rdwSdChecks = this.checkedValue.value.rdwSdChecks ? "sent" : "not sent";
  info.rbcChecks = this.checkedValue.value.rbcChecks ? "sent" : "not sent";
  info.bloodUreaChecks = this.checkedValue.value.bloodUreaChecks ? "sent" : "not sent";
  info.serumCreatinineChecks = this.checkedValue.value.serumCreatinineChecks ? "sent" : "not sent";
  info.papSmaearChecks = this.checkedValue.value.papSmaearChecks ? "sent" : "not sent";
}



this.formD.addFormAllCategory(info).subscribe({next:data=>{
this.obj=data;
this.getrefId=data;
this.referenceDivShow==true
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

});


}
selectAll(e: any){
  if(e.target.checked==true){
    this.checks=true;
  }
  else{
    this.checks=false;
  }
}

//already known check value
selected(e:any){
  if(e.target.checked==true){
    this.alreadyKnownChecks=true;
  }
  else{
    this.alreadyKnownChecks=false;
  }
  
}


onCancel(){
  this.router.navigate(['/']);
}

//checkbox clicked

onCheckboxChange(event: Event) {
  const isChecked = (event.target as HTMLInputElement).checked;
  if (isChecked) {
    console.log(`hb checkbox clicked`);
  }
}

onSelectAllCheckboxChange(event: Event) {
  const isChecked = (event.target as HTMLInputElement).checked;
  if (isChecked) {
    console.log(`Select All checkbox clicked`);
  }
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


//other validator

otherDiseaseValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const selectedDiseases = control.get('selectedDiseases')?.value || [];
    const otherDisease = control.get('otherDisease');

    if (selectedDiseases.includes('Others') && !otherDisease?.value) {
      return { required: true };
    }

    return null;
  };
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




@ViewChild('firstbody') pdfContent!: ElementRef;

  downloadPDF() {
    const content = this.pdfContent.nativeElement;
    const options = {
      margin: 10,
      filename: 'downloaded-document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
      .from(content)
      .set(options)
      .outputPdf()
      .then(pdf => {
        // Download the generated PDF
        const blob = new Blob([pdf], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = options.filename;
        a.click();
        URL.revokeObjectURL(url);
      });
  }



}