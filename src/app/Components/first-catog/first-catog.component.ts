import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormSubmitService } from 'src/app/services/form-submit.service';
import { categoryFirst } from 'src/app/classes/firstCategory';
import { ApiService } from 'src/app/services/api.service';
import { AllCategoryForm } from 'src/app/classes/AllFormData';


@Component({
  selector: 'app-first-catog',
  templateUrl: './first-catog.component.html' ,
  styleUrls: ['./first-catog.component.css']
})
export class FirstCatogComponent implements OnInit {
  diagnosed:string='';
  test:any;
  @Input() title: string = '';
  headerTitle:string='';
  flag=0;
  example:string='';
  optionSelected:string='';
  ppp:any;
  obj: any;
  selectedOpt:any;
  msg:string;
  formSaved=false;

   //multiselect code 05-06-2023

   dropdownList:any = [];
   selectedItems :any= [];
   dropdownSettings = {};
   requiredField: boolean = false;
   //ends


  inputValue:any;
  currentDate = new Date();

  //input fields data
  formFieldsData:FormGroup;
  //ends
  

  //ppp form div
  showPppDiv=true;

  loginUserDistrict=sessionStorage.getItem("district");
  loginUserFacility=sessionStorage.getItem("facility");
  loginUserFacilityType=sessionStorage.getItem("facilityType");
  loginUserFirstname=sessionStorage.getItem("firstname");
  loginUserLastname=sessionStorage.getItem("lastname");
  DoctorName:string;
  

  temp:any;

  //pateints details

  PPPID:string;
  Patientname:string
  Age:string;
 Gender:string;
  MobileNo:string;
 Address:string;

  //ends

  memberId: string;
  constructor(private route:ActivatedRoute, private apiService:ApiService,private formD:FormSubmitService, private router:Router, private fb:FormBuilder) {
   
  }
  
 //diagnosis multi select start

 
selectedItem: any[];
displayData:any;
listDrop:any;
 
 //diagnosis ends
 removeValue(value: string) {
  const index = this.listDrop.indexOf(value);
  if (index >= 0) {
    this.listDrop.splice(index, 1);
  }
}
  

  alreadyKnownChecks=false;
  detailsStringData:any=sessionStorage.getItem('navigationExtra');
  detailsData=JSON.parse(this.detailsStringData);

  ngOnInit(): void {

    this.temp=this.detailsData;
    this.memberId=this.temp.memberId;
    this.ppp=this.temp.pppId;
    this.headerTitle="Category I (0-6 months)";
  
    //patient Details start
    sessionStorage.setItem("pppid",this.temp.pppId);
    sessionStorage.setItem("namePatient",this.temp.firstname);
    sessionStorage.setItem("Age",this.temp.age);
    sessionStorage.setItem("gender",this.temp.gender);
    sessionStorage.setItem("mobileNo",this.temp.mobileNo);
    sessionStorage.setItem("address",this.temp.address);

    this.PPPID=sessionStorage.getItem("pppid");
    this.Patientname=sessionStorage.getItem("namePatient");
    this.Age=sessionStorage.getItem("Age");
    this.Gender=sessionStorage.getItem("gender");
    this.MobileNo=sessionStorage.getItem("mobileNo");
    this.Address=sessionStorage.getItem("address");

    //patient details ends

    if(this.loginUserLastname=="null" || this.loginUserLastname==null || this.loginUserLastname.includes('undefined')){
      this.DoctorName=this.loginUserFirstname;
    }
    else{
      this.DoctorName=this.loginUserFirstname+" "+this.loginUserLastname;
    }

   

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

     this.getNationalHealthProgramsList();


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
      weight:new FormControl('', [Validators.required, Validators.min(2),Validators.max(10), Validators.pattern('^[0-9]*(\.[0-9]+)?$')]),  /**/ 
      height:new FormControl('', [Validators.required, Validators.min(20),Validators.max(80), Validators.pattern('^[0-9]*(\.[0-9]+)?$')]),  /** */
      headCircum:new FormControl('', [Validators.required, Validators.min(25),Validators.max(50), Validators.pattern('^[0-9]*$')]),  /** */
      oxygenSaturation:new FormControl('', [Validators.required, Validators.min(70),Validators.max(100), Validators.pattern('^[0-9]*$')]),
      pallor:new FormControl('' ),
      jaundice:new FormControl('' ),
      cyanosis:new FormControl('' ),
      heartRate:new FormControl('', [Validators.required, Validators.min(50),Validators.max(180), Validators.pattern('^[0-9]*$')]),
      respiratoryRate:new FormControl('', [Validators.required, Validators.min(20),Validators.max(80), Validators.pattern('^[0-9]*$')]),
      cappillaryRefillTime:new FormControl('', [Validators.required, Validators.min(1),Validators.max(3), Validators.pattern('^[0-9]*$')]),
      congenitalAnomalies:new FormControl('' ),
      anteriorFontanelle:new FormControl('' ),
      skinLesions:new FormControl('' ),
      chest:new FormControl('' ),
      cvs:new FormControl('' ),
      perAbdomen:new FormControl('' ),
      cns:new FormControl('' ),
      hearing:new FormControl('' ),
      eyeCongenital:new FormControl('' ),
      movementOfEyeBallWithLight:new FormControl('' ),
      hB:new FormControl('', [Validators.required, Validators.min(14),Validators.max(24), Validators.pattern('^[0-9]*(\.[0-9]+)?$')]),
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

  //diagnosis starts
  diagnosisOtherField=false;
 selectDropval(obj:any){
  if(obj=='Others'){
      this.diagnosisOtherField=true;
  }
  console.log(obj);
  if(this.displayData!=null && this.displayData!=''){
    this.displayData=this.displayData+""+obj+",";
    
  }
  else if(this.displayData==undefined){
    this.displayData='';
    this.displayData=this.displayData+""+obj+",";
   
  }
 }

 otherOption(oB:any){
  if(oB!='Others'){
  this.diagnosisOtherField=false;
  }
 }

 //diagnosis ends


//already known check value
  selected(e:any){
    if(e.target.checked==true){
      this.alreadyKnownChecks=true;
    }
    else{
      this.alreadyKnownChecks=false;
    }
    
  }



  

//to save the form

getrefId:any;
referenceDivShow=false;
printButton=false;
onSave(){
  
  
  //delivery type
  var e = (document.getElementById("DeliveryType")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var Deliverytype = (<HTMLSelectElement><unknown>opt).innerText;

  //CryAfterBirth
  var e = (document.getElementById("CryAfterBirth")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var cryAfterBirth = (<HTMLSelectElement><unknown>opt).innerText;

  //AnyHistory
  var e = (document.getElementById("AnyHistoryOfPreviousAdmIllness")) as HTMLSelectElement;
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

  //HIstory feeding

  var e = (document.getElementById("FeedingHistory")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var feedingHistory = (<HTMLSelectElement><unknown>opt).innerText;

  //Contact with Tb
  var e = (document.getElementById("tbContact")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var TbContact = (<HTMLSelectElement><unknown>opt).innerText;

  //neck Holding

  var e = (document.getElementById("neckHolding")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var NeckHolding = (<HTMLSelectElement><unknown>opt).innerText;

  //Social
  var e = (document.getElementById("SocialSmile")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var socialSmile = (<HTMLSelectElement><unknown>opt).innerText;
  
  //Siting with support
  var e = (document.getElementById("sittingWithSupport")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var SittingWithSupport = (<HTMLSelectElement><unknown>opt).innerText;

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

  //Anterior
  var e = (document.getElementById("AnteriorFontanelle")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var anteriorFontanelle = (<HTMLSelectElement><unknown>opt).innerText;

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
  var e = (document.getElementById("EyeCongenital")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var eyeCongenital = (<HTMLSelectElement><unknown>opt).innerText;

  //movement of eye
  var e = (document.getElementById("MovementOfEye")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var movementOfEye = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("reasonForReferValue")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var reasonForReferSelectedVal = (<HTMLSelectElement><unknown>opt).innerText;
  


  var info=new AllCategoryForm();
  info.patientId=this.detailsData.memberId;
  info.district=this.loginUserDistrict;
  info.facility=this.loginUserFacilityType+"/"+this.loginUserFacility;
  info.category='1';
  info.createdDate=this.currentDate;
  info.createdBy=this.DoctorName;
  info.userId=sessionStorage.getItem('username').trim();

  info.deliveryType=Deliverytype;
  info.cryAfterBirth=cryAfterBirth;
  info.histroyAdmIllness=anyHistoryOfPreviousAdmIllness;
//any significant family history

  info.historyFamily=familyHistory;
  info.familyHistoryIfYes=this.formFieldsData.get("familyHistoryIfYes").value.trim();;
  info.immunStatus=immunization;
  info.historyFeeding=feedingHistory;
  info.contactWithTB=TbContact;
  info.neckHolding=NeckHolding;
  info.socialSmile=socialSmile;
  info.sittingWithSupport=SittingWithSupport;

  //general

  info.weight=this.formFieldsData.get("weight").value.trim();
  info.headCircum=this.formFieldsData.get("headCircum").value.trim();
  info.height=this.formFieldsData.get("height").value.trim();
  info.pallor=Pallor;
  info.jaundice=Jaundice;
  info.cyanosis=cyanosis;
  info.heartRate=this.formFieldsData.get("heartRate").value.trim();
  info.respiratoryRate=this.formFieldsData.get("respiratoryRate").value.trim();
  info.cappillaryRefillTime=this.formFieldsData.get("cappillaryRefillTime").value.trim();
  info.oxygenSaturation=this.formFieldsData.get("oxygenSaturation").value.trim();
  info.congenitalAnomalies=congenitalAnomalies;
  info.anteriorFontanelle=anteriorFontanelle;
  info.skinLesions=skinLesions;
  info.chest=Chest;
  info.cvs=Cvs;
  info.perAbdomen=PerAbdomen;
  info.cns=Cns;
  info.hearing=Hearing;
  info.eyeCongenital=eyeCongenital;
  info.movementOfEyeBallWithLight=movementOfEye;
  info.hb=this.formFieldsData.get("hB").value.trim();
  info.relevantInvestigation=this.formFieldsData.get("relevantInvestigation").value.trim();

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

  info.prescription=this.formFieldsData.get("prescription").value.trim();;
  this.referenceDivShow=true;

  //reason for refer
  info.nHProgValue=this.natHealthProgSelectedValue;
  info.reasonForRefer=reasonForReferSelectedVal;


  console.log(info);


  this.formD.addFormAllCategory(info).subscribe({next:(data:any)=>{
  this.obj=data;
  this.referenceDivShow==true
  this.getrefId=data;
  console.log("------------------------------------",this.getrefId.refernceId);
  console.log(this.obj);
  this.msg = "*Patient Information Added Successfully!!";
  window.scrollTo(0,0);
  window.alert(this.msg+" "+" The Reference Id is :- "+data.refernceId);
  this.printButton=true;
  sessionStorage.removeItem("PPPID");
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
  

  this.formSaved=true;
  
}

  cancel(){
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


//
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
