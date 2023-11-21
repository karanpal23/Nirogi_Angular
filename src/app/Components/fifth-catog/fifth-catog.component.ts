
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllCategoryForm } from 'src/app/classes/AllFormData';
import { FifthCategory } from 'src/app/classes/FifthCategory';
import { ApiService } from 'src/app/services/api.service';
import { FormSubmitService } from 'src/app/services/form-submit.service';


@Component({
  selector: 'app-fifth-catog',
  templateUrl: './fifth-catog.component.html',
  styleUrls: ['./fifth-catog.component.css']
})
export class FifthCatogComponent implements OnInit {
  selectedOpt: string='';
  msg:any;
  example:string='';
  ppp:any;
  memberId: any;
  currentDate = new Date();
  obj:FifthCategory;
  diagnosed:string='';

  //multiselect code 05-06-2023

  dropdownList:any = [];
  selectedItems :any= [];
  dropdownSettings = {};
  requiredField: boolean = false;
  //ends

  loginUserDistrict=sessionStorage.getItem("district");
  loginUserFacility=sessionStorage.getItem("facility");
  loginUserFacilityType=sessionStorage.getItem("facilityType");
  loginUserFirstname=sessionStorage.getItem("firstname");
  loginUserLastname=sessionStorage.getItem("lastname");
  form={
    weight:'',
    height:'',
    bmi:'',
    pulseRate:'',
    bp:'',
    rightEye:'',
    leftEye:'',
    genitalExam:'',
    breastExam:'',
    jointExam:'',
    oralExam:'',
    hb:'',
    tlc:'',
    neutrophils:'',
    monocytes:'',
    basophils:'',
    eosinophils:'',
    lymphocytes:'',
    urineRoutineExam:'',
    packedCellVolume:'',
    meanCorpusVolume:'',
    meanCorpusHemoglobin:'',
    meanCorpusHemoglobinConcen:'',
    pletletCount:'',
    rdwCv:'',
    rdwSd:'',
    rbcCount:'',
    rbs:'',
    serumCholestrol:'',
    bloodUrea:'',
    serumCreatinine:'',
    psa:'',
    tsh:'',
    relevantInvestigation:'',
    alreadyKnown:'',

    //prescription
	prescription:''
  }
  successfull: string;
  

  //pateints details

  PPPID:string;
  Patientname:string
  Age:string;
 Gender:string;
  MobileNo:string;
 Address:string;

  //ends
  checks=false;
  alreadyKnownChecks: boolean;
  DoctorName: string;
  calculatedBmi: any;
  

  //after clicked on check box
  checkedValue:FormGroup;
  formFieldsData: FormGroup;
  
  constructor(private router:Router,private formD:FormSubmitService,private fb: FormBuilder,private apiService:ApiService) { 
 
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
    serumCholestrolChecks:[false],
    bloodUreaChecks:[false],
    serumCreatinineChecks:[false],
    psaChecks:[false],
    tshChecks:[false],
    papSmearChecks:[false],


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
      serumCholestrol:'',
      bloodUrea:'',
      serumCreatinine:'',
      psa:'',
      tsh:'',
      papSmear:'',
  });
  }

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
      respiratoryRate:new FormControl(''),
      congenitalAnomalies:new FormControl('' ),
      anteriorFontanelle:new FormControl('' ),
      skinLesions:new FormControl('' ),
      chest:new FormControl('' ),
      cvs:new FormControl('' ),
      breastExamination:new FormControl(''),
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

    
    //disabling letter e from input field ends


  }

  selected(e:any){
    if(e.target.checked==true){
      this.alreadyKnownChecks=true;
    }
    else{
      this.alreadyKnownChecks=false;
    }
    
  }


  test() {
    
    console.log(this.checkedValue.value);
    console.log(this.checkedValue.value.tlc);
    console.log(this.checkedValue.value.hB,"******************");
    console.log(this.checkedValue.value.dlc);
  }


  submitSuccessfullmsg:string;  
  getrefId:any;
  referenceDivShow=false;
  printButton=false;
//   onSave(){

    
//     //pallor
//     var e = (document.getElementById("pallor")) as HTMLSelectElement;
//     var opt = e.options[e.selectedIndex];
//     var Pallor = (<HTMLSelectElement><unknown>opt).innerText;

//     //Jaundice
//     var e = (document.getElementById("jaundice/Cyanosis")) as HTMLSelectElement;
//     var opt = e.options[e.selectedIndex];
//     var Jaundice = (<HTMLSelectElement><unknown>opt).innerText;

//     var e = (document.getElementById("clubbing")) as HTMLSelectElement;
//     var opt = e.options[e.selectedIndex];
//     var Clubbing = (<HTMLSelectElement><unknown>opt).innerText;

//     var e = (document.getElementById("lymphadenopathy")) as HTMLSelectElement;
//     var opt = e.options[e.selectedIndex];
//     var Lymphadenopathy = (<HTMLSelectElement><unknown>opt).innerText;

//     var e = (document.getElementById("pedalOedema")) as HTMLSelectElement;
//     var opt = e.options[e.selectedIndex];
//     var PedalOedema = (<HTMLSelectElement><unknown>opt).innerText;

//     //chest
//     var e = (document.getElementById("chest")) as HTMLSelectElement;
//     var opt = e.options[e.selectedIndex];
//     var Chest = (<HTMLSelectElement><unknown>opt).innerText;

//     //cvs
//     var e = (document.getElementById("cvs")) as HTMLSelectElement;
//     var opt = e.options[e.selectedIndex];
//     var Cvs = (<HTMLSelectElement><unknown>opt).innerText;

//     //per Abdomen
//     var e = (document.getElementById("perAbdomen")) as HTMLSelectElement;
//     var opt = e.options[e.selectedIndex];
//     var PerAbdomen = (<HTMLSelectElement><unknown>opt).innerText;

//     //cns
//     var e = (document.getElementById("cns")) as HTMLSelectElement;
//     var opt = e.options[e.selectedIndex];
//     var Cns = (<HTMLSelectElement><unknown>opt).innerText;

//     //hearing
//     var e = (document.getElementById("hearing")) as HTMLSelectElement;
//     var opt = e.options[e.selectedIndex];
//     var Hearing = (<HTMLSelectElement><unknown>opt).innerText;

//     //eye congenital
//     var e = (document.getElementById("colorVision")) as HTMLSelectElement;
//     var opt = e.options[e.selectedIndex];
//     var ColorVision = (<HTMLSelectElement><unknown>opt).innerText;

//     //movement of eye
//     var e = (document.getElementById("dentalExamination")) as HTMLSelectElement;
//     var opt = e.options[e.selectedIndex];
//     var DentalExamination = (<HTMLSelectElement><unknown>opt).innerText;


//     var e = (document.getElementById("oralExam")) as HTMLSelectElement;
//     var opt = e.options[e.selectedIndex];
//     var OralExam = (<HTMLSelectElement><unknown>opt).innerText;

//     var e = (document.getElementById("papSmear")) as HTMLSelectElement;
//     var opt = e.options[e.selectedIndex];
//     var PapSmear = (<HTMLSelectElement><unknown>opt).innerText;

    
//     var e = (document.getElementById("genitalExamination")) as HTMLSelectElement;
//     var opt = e.options[e.selectedIndex];
//     var GenitalExamination = (<HTMLSelectElement><unknown>opt).innerText;

//     var e = (document.getElementById("jointExamination")) as HTMLSelectElement;
//     var opt = e.options[e.selectedIndex];
//     var JointExamination = (<HTMLSelectElement><unknown>opt).innerText;

//   var info=new FifthCategory();
//   info.patientId=this.detailsData.memberId;
//   info.userId=sessionStorage.getItem('username').trim();

  
// info.district=this.loginUserDistrict.trim();
// info.facility=(this.loginUserFacilityType+"/"+this.loginUserFacility).trim();
// info.category='5';
// info.createdDate=this.currentDate;
// info.createdBy=this.DoctorName.trim();

//   /*general exam */
//   info.weight=(this.formFieldsData.get("weight").value);
//   info.height=(this.formFieldsData.get("height").value);
//   info.bmi=(this.calculatedBmi);
//   info.pallor=Pallor;
//   info.jaundiceCyanosis=Jaundice;
//   info.pulseRate=(this.formFieldsData.get("pulseRate").value);
//   info.bloodPressure=(this.formFieldsData.get("bloodPressure").value);
//   info.pedalOedema=PedalOedema;
//   info.lymphadenopathy=Lymphadenopathy;
//   info.clubbing=Clubbing;


//   /*Systemic */

//   info.chest=Chest;
//   info.cvs=Cvs;
//   info.perAbdomen=PerAbdomen;
//   info.cns=Cns;
//   info.hearing=Hearing;
//   info.rightEye=(this.formFieldsData.get("rightEye").value);
//   info.leftEye=(this.formFieldsData.get("leftEye").value);
//   info.colorVision=ColorVision;
//   info.dentalExaminationAbnormality=DentalExamination;
//   info.genitalExamination=GenitalExamination;
//   info.breastExamination=(this.formFieldsData.get("breastExamination").value);
//   info.jointExamination=JointExamination;
//   info.oralExamination=OralExam;

//   /*Mandatory */

//   info.hb=(this.checkedValue.value.hB);
//   info.tlc=this.checkedValue.value.tlc;
//   info.neutrophils=this.checkedValue.value.neutrophils;
//   info.lymphocytes=this.checkedValue.value.lymphocytes;
//   info.monocytes=this.checkedValue.value.monocytes;
//   info.eosinophils=this.checkedValue.value.eosinophils;
//   info.basophils=this.checkedValue.value.basophils;
//   info.packedCellVolume=this.checkedValue.value.packedCellVolume;
//   info.meanCorpusVolume=this.checkedValue.value.meanCorpusVolume;
//   info.meanCorpusHemoglobin=this.checkedValue.value.meanCorpusHemoglobin;
//   info.meanCorpusHemoglobinConcentration=this.checkedValue.value.meanCorpusHemoglobinConcen;
//   info.platletCount=this.checkedValue.value.pletletCount;
//   info.rdwCv=this.checkedValue.value.rdwCv;
//   info.rdwSd=this.checkedValue.value.rdwSd;
//   info.rbcCount=this.checkedValue.value.rbcCount;
//   info.rbs=this.checkedValue.value.rbs;
//   info.urineRoutineExamination=this.checkedValue.value.urineRoutineExamination;
//   info.relevantInvestigation=this.checkedValue.value.relevantInvestigation;
//   info.serumCholestrol=this.checkedValue.value.serumCholestrol;
//   info.bloodUrea=this.checkedValue.value.bloodUrea;
//   info.serumCreatinine=this.checkedValue.value.serumCreatinine;
//   info.tsh=this.checkedValue.value.tsh;
//   info.psaForMales=this.checkedValue.value.psa;
//   info.papSmear=PapSmear;


//   //diagnosis

//   info.diagnosed=String(this.selectedDiseases)+"- "+(this.formFieldsData.get("otherDisease").value);
//   if(this.alreadyKnownChecks==true){
//     info.alreadyKnown="Yes";
//   }
//   else{
//     info.alreadyKnown="No";
//   }
//   //prescription

//   info.prescription=(this.formFieldsData.get("prescription").value);
//     //checks for lab tests sent
// var Ordered=new OrderedLabTests();
// Ordered.patientId=this.detailsData.memberId;
// Ordered.createdDate=this.currentDate;
// Ordered.createdBy=this.DoctorName.trim();

// Ordered.userId=sessionStorage.getItem('username').trim();
// if(this.checkedValue.value.selectAll){
  
//   Ordered.hb="sent";
//   Ordered.tlc="sent";
//   Ordered.neutrophils="sent";
//   Ordered.lymphocytes="sent";
//   Ordered.monocytes="sent"
//   Ordered.eosinophils="sent"
//   Ordered.basophils="sent"
//   Ordered.packedCellVolume="sent"
//   Ordered.meanCorpuscularVolume="sent"
//   Ordered.meanCorpuscularHemoglobin="sent"
//   Ordered.meanCorpuscularHemoglobinConcentration="sent"
//   Ordered.pletelet="sent"
//   Ordered.rdwCv="sent"
//   Ordered.rdwSd="sent"
//   Ordered.rbs="sent"
//   Ordered.rbc="sent"
//   Ordered.serumCholesterol="sent"
//   Ordered.serumCreatinine="sent"
//   Ordered.bloodUrea="sent"
//   Ordered.psa="sent"
//   Ordered.tsh="sent"
//   Ordered.papSmaear="sent"
//   Ordered.urineRoutineExam="sent"
//   Ordered.relevantInvestigation="sent"

//   console.log(Ordered);
// }
// else{
//   if(this.checkedValue.value.hBChecks==true){
//     Ordered.hb="sent"; 
//   }
//   else{
//     Ordered.hb="not sent";
//   }

//   if(this.checkedValue.value.tlcChecks==true){
//     Ordered.tlc="sent"; 
//   }
//   else{
//     Ordered.tlc="not sent";
//   }
//   if(this.checkedValue.value.dlcChecks==true){
//     Ordered.neutrophils="sent";
//   }
//   else{
//     Ordered.neutrophils="not sent";
//   }
//   if(this.checkedValue.value.dlcChecks==true){
    
//   Ordered.lymphocytes="sent"; 
//   }
//   else{
//     Ordered.lymphocytes="not sent";
//   }
//   if(this.checkedValue.value.dlcChecks==true){
//     Ordered.monocytes="sent"
//   }
//   else{
//     Ordered.monocytes="not sent";
//   }
//   if(this.checkedValue.value.dlcChecks==true){
//     Ordered.eosinophils="sent"; 
//   }
//   else{
//     Ordered.eosinophils="not sent";
//   }
//   if(this.checkedValue.value.dlcChecks==true){
//     Ordered.basophils="sent"; 
//   }
//   else{
//     Ordered.basophils="not sent";
//   }
//   if(this.checkedValue.value.packedCellVolumeChecks==true){
//     Ordered.packedCellVolume="sent"; 
//   }
//   else{
//     Ordered.packedCellVolume="not sent";
//   }
//   if(this.checkedValue.value.meanCorpusVolumeChecks==true){
//     Ordered.meanCorpuscularVolume="sent"; 
//   }
//   else{
//     Ordered.hb="not sent";
//   }
//   if(this.checkedValue.value.meanCorpusHemoglobinChecks==true){
//     Ordered.meanCorpuscularHemoglobin="sent"; 
//   }
//   else{
//     Ordered.hb="not sent";
//   }
//   if(this.checkedValue.value.meanCorpusHemoglobinConcenChecks==true){
//     Ordered.meanCorpuscularHemoglobinConcentration="sent"; 
//   }
//   else{
//     Ordered.meanCorpuscularHemoglobinConcentration="not sent";
//   }
//   if(this.checkedValue.value.pletletCountChecks==true){
//     Ordered.pletelet="sent"; 
//   }
//   else{
//     Ordered.pletelet="not sent";
//   }
//   if(this.checkedValue.value.rdwCvChecks==true){
//     Ordered.rdwCv="sent"; 
//   }
//   else{
//     Ordered.rdwCv="not sent";
//   }
//   if(this.checkedValue.value.rdwSdChecks==true){
//     Ordered.rdwSd="sent"; 
//   }
//   else{
//     Ordered.rdwSd="not sent";
//   }
//   if(this.checkedValue.value.rbsChecks==true){
//     Ordered.rbs="sent"; 
//   }
//   else{
//     Ordered.rbs="not sent";
//   }
//   if(this.checkedValue.value.rbcCountChecks==true){
//     Ordered.rbc="sent"; 
//   }
//   else{
//     Ordered.rbc="not sent";
//   }
//   if(this.checkedValue.value.urineRoutineExaminationChecks==true){
//     Ordered.urineRoutineExam="sent"; 
//   }
//   else{
//     Ordered.urineRoutineExam="not sent";
//   }
//   if(this.checkedValue.value.relevantInvestigationChecks==true){
//     Ordered.relevantInvestigation="sent"; 
//   }
//   else{
//     Ordered.relevantInvestigation="not sent";
//   }

//   if(this.checkedValue.value.serumCholestrolChecks==true){
//     Ordered.serumCholesterol="sent"; 
//   }
//   else{
//     Ordered.serumCholesterol="not sent";
//   } 

//   if(this.checkedValue.value.serumCreatinineChecks==true){
//     Ordered.serumCreatinine="sent"; 
//   }
//   else{
//     Ordered.serumCreatinine="not sent";
//   } 

//   if(this.checkedValue.value.bloodUreaChecks==true){
//     Ordered.bloodUrea="sent"; 
//   }
//   else{
//     Ordered.bloodUrea="not sent";
//   } 
//   if(this.checkedValue.value.tshChecks==true){
//     Ordered.tsh="sent"; 
//   }
//   else{
//     Ordered.tsh="not sent";
//   } 
//   if(this.checkedValue.value.psaChecks==true){
//     Ordered.psa="sent"; 
//   }
//   else{
//     Ordered.psa="not sent";
//   } 
//   if(this.checkedValue.value.papSmearChecks==true){
//     Ordered.papSmaear="sent"; 
//   }
//   else{
//     Ordered.papSmaear="not sent";
//   }
  

// }



  

//   console.log(info);
//   this.referenceDivShow=true;
//   this.formD.addForm(info).subscribe({next:data=>{
//     this.obj=data;
//     this.getrefId=data;
//     console.log("------------------------------------",this.getrefId.refernceId);
//     console.log(this.obj);
//     Ordered.referenceId=this.getrefId.refernceId;
//   console.log(Ordered);
//     this.submitSuccessfullmsg = "*Patient Information Added Successfully!!";
//     this.formD.addOrderedInvestigations(Ordered).subscribe();
//     window.scrollTo(0,0);
//     window.alert(this.submitSuccessfullmsg+" "+" The Reference Id is :- "+data.refernceId);
//     this.printButton=true;
    
//   },
//   error: (err: HttpErrorResponse) => {
//    alert(err.status+" "+"Something went wrong");
   
//  }});

  
  

// }

onSave(){

    
  //pallor
  var e = (document.getElementById("pallor")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var Pallor = (<HTMLSelectElement><unknown>opt).innerText;

  //Jaundice
  var e = (document.getElementById("jaundice/Cyanosis")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var Jaundice = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("clubbing")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var Clubbing = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("lymphadenopathy")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var Lymphadenopathy = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("pedalOedema")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var PedalOedema = (<HTMLSelectElement><unknown>opt).innerText;

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


  var e = (document.getElementById("oralExam")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var OralExam = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("papSmear")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var PapSmear = (<HTMLSelectElement><unknown>opt).innerText;

  
  var e = (document.getElementById("genitalExamination")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var GenitalExamination = (<HTMLSelectElement><unknown>opt).innerText;

  var e = (document.getElementById("jointExamination")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var JointExamination = (<HTMLSelectElement><unknown>opt).innerText;


  var e = (document.getElementById("reasonForReferValue")) as HTMLSelectElement;
  var opt = e.options[e.selectedIndex];
  var reasonForReferSelectedVal = (<HTMLSelectElement><unknown>opt).innerText;

var info=new AllCategoryForm();
info.patientId=this.detailsData.memberId;
info.userId=sessionStorage.getItem('username').trim();


info.district=this.loginUserDistrict.trim();
info.facility=(this.loginUserFacilityType+"/"+this.loginUserFacility).trim();
info.category='5';
info.createdDate=this.currentDate;
info.createdBy=this.DoctorName.trim();

/*general exam */
info.weight=(this.formFieldsData.get("weight").value);
info.height=(this.formFieldsData.get("height").value);
info.bmi=(this.calculatedBmi);
info.pallor=Pallor;
info.jaundiceCyanosis=Jaundice;
info.pulseRate=(this.formFieldsData.get("pulseRate").value);
info.bloodPressure=(this.formFieldsData.get("bloodPressure").value);
info.pedalOedema=PedalOedema;
info.lymphadenopathy=Lymphadenopathy;
info.clubbing=Clubbing;


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
info.genitalExamination=GenitalExamination;
info.breastExamination=(this.formFieldsData.get("breastExamination").value);
info.jointExamination=JointExamination;
info.oralExamination=OralExam;

/*Mandatory */

info.hb=(this.checkedValue.value.hB);
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
info.rbcCount=this.checkedValue.value.rbcCount;
info.rbs=this.checkedValue.value.rbs;
info.urineRoutineExamination=this.checkedValue.value.urineRoutineExamination;
info.relevantInvestigation=this.checkedValue.value.relevantInvestigation;
info.serumCholestrol=this.checkedValue.value.serumCholestrol;
info.bloodUrea=this.checkedValue.value.bloodUrea;
info.serumCreatinine=this.checkedValue.value.serumCreatinine;
info.tsh=this.checkedValue.value.tsh;
info.psaForMales=this.checkedValue.value.psa;
info.papSmear=PapSmear;


//diagnosis

let diagnosisValue=String(this.selectedDiseases)+"- "+(this.formFieldsData.get("otherDisease").value);
if(diagnosisValue=="-" || diagnosisValue==" - " || diagnosisValue=="- "){
  info.diagnosed="none"
}else{
  info.diagnosed=diagnosisValue;
}
if(this.alreadyKnownChecks==true){
  info.alreadyKnown="Yes";
}
else{
  info.alreadyKnown="No";
}
//prescription

info.prescription=(this.formFieldsData.get("prescription").value);
  //checks for lab tests sent

  //reason for refer
  info.nHProgValue=this.natHealthProgSelectedValue;
  info.reasonForRefer=reasonForReferSelectedVal;


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
    
    console.log(info);
  } else {
    info.hbChecks = this.checkedValue.value.hBChecks ? "sent" : "not sent";
    info.relevantInvestigationChecks = this.checkedValue.value.relevantInvestigationChecks ? "sent" : "not sent";
    info.rbsChecks = this.checkedValue.value.rbsChecks ? "sent" : "not sent";
    info.urineRoutineExamChecks = this.checkedValue.value.urineRoutineExamChecks ? "sent" : "not sent";
    info.serumCholesterolChecks = this.checkedValue.value.serumCholestrolChecks ? "sent" : "not sent";
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
    info.meanCorpuscularVolumeChecks = this.checkedValue.value.meanCorpusVolumeChecks ? "sent" : "not sent";
    info.meanCorpuscularHemoglobinChecks = this.checkedValue.value.meanCorpusHemoglobinChecks ? "sent" : "not sent";
    info.meanCorpuscularHemoglobinConcentrationChecks = this.checkedValue.value.meanCorpusHemoglobinConcentrationChecks ? "sent" : "not sent";
    info.pleteletChecks = this.checkedValue.value.pletletCountChecks ? "sent" : "not sent";
    info.rdwSdChecks = this.checkedValue.value.rdwSdChecks ? "sent" : "not sent";
    info.rbcChecks = this.checkedValue.value.rbcChecks ? "sent" : "not sent";
    info.bloodUreaChecks = this.checkedValue.value.bloodUreaChecks ? "sent" : "not sent";
    info.serumCreatinineChecks = this.checkedValue.value.serumCreatinineChecks ? "sent" : "not sent";
    info.papSmaearChecks = this.checkedValue.value.papSmearChecks ? "sent" : "not sent";
  }
  
  console.log(info);
  





console.log(info);
this.referenceDivShow=true;
this.formD.addFormAllCategory(info).subscribe({next:data=>{
  this.obj=data;
  this.getrefId=data;
  console.log("------------------------------------",this.getrefId.refernceId);
  console.log(this.obj);
  this.submitSuccessfullmsg = "*Patient Information Added Successfully!!";
  window.scrollTo(0,0);
  window.alert(this.submitSuccessfullmsg+" "+" The Reference Id is :- "+data.refernceId);
  this.printButton=true;
  // Generate PDF
 
  
  
},
// error: (err: HttpErrorResponse) => {
//  alert(err.status+" "+"Something went wrong");
 
// }
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

//calculate emi
weightValue:any;
heightValue:any;
calculateBmi(){
  //calculate bmi
    this.heightValue=Number(this.formFieldsData.get("height").value)/100;
  //  this.weightValue=Number(this.form.weight);

   this.calculatedBmi=((this.formFieldsData.get("weight").value)/((this.heightValue)*(this.heightValue))).toFixed(2);
  console.log("++++++++++++++++++",this.calculatedBmi);
}


selectAll(e:any){
  if(e.target.checked==true){
    this.checks=true;
  }
  else{
    this.checks=false;
  }
  
}

//already known check value
onCancel(){
  this.router.navigate(['/']);
}

onCheckboxChange(event: Event) {
  const isChecked = (event.target as HTMLInputElement).checked;
  if (isChecked) {
    console.log(`hb checkbox clicked`);
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
