import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReferenceId } from 'src/app/classes/referenceId';
import { ApiService } from 'src/app/services/api.service';
import { FormSubmitService } from 'src/app/services/form-submit.service';
import { MemberServiceService } from 'src/app/services/member-service.service';

@Component({
  selector: 'app-ref-third-category',
  templateUrl: './ref-third-category.component.html',
  styleUrls: ['./ref-third-category.component.css']
})
export class RefThirdCategoryComponent implements OnInit {
  successfull: string;
  obj:ReferenceId;
  //selectedOpt: string='';
  msg: string;
  memberId: any;
  refDistrict:any;
  refFacility:any;
  refPatientId:any;
  referenceId:string;
  showData:any;
  currentDate = new Date();

  detailsStringData:any=sessionStorage.getItem('navigationExtra');
  detailsData=JSON.parse(this.detailsStringData);
  ppp: string;

   //multiselect code 05-06-2023

   dropdownList:any = [];
   selectedItems :any= [];
   dropdownSettings = {};
   requiredField: boolean = false;
   formFieldsData: FormGroup;
   //ends

  checkedValue:FormGroup;
  constructor(private router:Router,private formD:FormSubmitService,private DataSearch:MemberServiceService,private sectionData:ApiService,private fb:FormBuilder) {
    this.checkedValue=this.fb.group({
      
      //input fields value
      hb:'',
      tlc:'',
      neutrophils:'',
      lymphocytes:'',
      monocytes:'',
      eosinophils:'',
      basophils:'',
      packedCellVolume:'',
      meanCorpuscularVolume:'',
      meanCorpuscularHemoglobin:'',
      meanCorpuscularHemoglobinConcentration:'',
      pletelet:'',
      rdwcv:'',
      rdwsd:'',
      rbc:'',
      rbs:'',
      urineRoutineExam:'',
      relevantInvestigation:'',
    });
   }

   reqData={
    memberId:''
   };

   historyData={
    referenceId:''
   };
  

  form={
    
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
    relevantInvestigation:''
  }

  viewFlag:any;
  ngOnInit() {
    //this.temp=this.selectedOpt;
    console.log("reference :")
    console.log(this.detailsData);
    this.memberId=this.detailsData.patientId;
    this.refDistrict=this.detailsData.district;
    this.refFacility=this.detailsData.facility;
    this.referenceId=this.detailsData.referenceId;
    
    this.viewFlag=this.detailsData.viewFlag;
    console.log("member id : ",this.detailsData.memberId);
    console.log(this.ppp);


    if(this.detailsData.memberId!='' ){
      if(this.viewFlag=='no'){
    this.reqData.memberId=this.detailsData.patientId
    this.historyData.referenceId=this.detailsData.referenceId;
       //patient details get
    console.log("==========",this.reqData)
    this.getPatientDetails(this.reqData);
    
    this.getPatientHistoryData(this.historyData);
    this.getPatientMilestonesData(this.historyData);
    this.getPatientGeneralData(this.historyData);
    this.getPatientSystemicData(this.historyData);
    this.getPatientDiagnosedData(this.historyData);
    this.getPatientMandateInvesData(this.historyData);
    }else{
      const searchData={
        patientId:''
      }
      searchData.patientId=this.detailsData.memberId
    this.historyData.referenceId=this.detailsData.referenceId;
      //patient details get
    console.log("==========",searchData)
    this.getPatientDetails(searchData);

    this.getPatientHistoryData(searchData);
    this.getPatientMilestonesData(searchData);
    this.getPatientGeneralData(searchData);
    this.getPatientSystemicData(searchData);
    this.getPatientDiagnosedData(searchData);
    this.getPatientMandateInvesData(searchData);
    }
  }

  //multiselect data 05-06-2023
  this.sectionData.getMultiSelectDropdownData().subscribe((res:any)=>{
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
 // this.selectedItems = diagnosed;
   //ends

 
}


//histroy section details
SectionDataReq:ReferenceId;
HistorySectionDataReq:any;

getPatientHistoryData(ref:any){
  this.sectionData.getHistoryRefIdData(ref).subscribe((res:any)=>{
    this.SectionDataReq=res;
    console.log("====history====="+JSON.stringify(this.SectionDataReq) );
    this.HistorySectionDataReq=this.SectionDataReq;
  })
}
//history section details code end

//Milestones section data
milestoneData:ReferenceId;
MilestonesList:any;

getPatientMilestonesData(ref:any){
  this.sectionData.getMilestoneRefIdData(ref).subscribe((res:any)=>{
    this.milestoneData=res;
    console.log("====milestones====="+JSON.stringify(this.milestoneData));
    this.MilestonesList=this.milestoneData;
  })
}

//milestones section end


//general section starts

generalData:ReferenceId;
GeneralDataList:any;

getPatientGeneralData(ref:any){
  this.sectionData.getGeneralRefIdData(ref).subscribe((res:any)=>{
    this.generalData=res;
    console.log("====general====="+JSON.stringify(this.generalData));
    this.GeneralDataList=this.generalData;
  })
}

//general section ends here

//systemic section starts

systemicData:ReferenceId;
SystemicList:any;

getPatientSystemicData(ref:any){
  this.sectionData.getSystemicRefIdData(ref).subscribe((res:any)=>{
    this.systemicData=res;
    console.log("====Systemic====="+JSON.stringify(this.systemicData));
    this.SystemicList=this.systemicData;
  })
}

//systemic section ends

//mandatory section starts

mandatoryData:ReferenceId;
MandatoryList:any;

getPatientMandateInvesData(ref:any){
  this.sectionData.getMandatoryRefIdData(ref).subscribe((res:any)=>{
    this.mandatoryData=res;
    console.log("====mandatory====="+JSON.stringify(this.mandatoryData));
    this.MandatoryList=this.mandatoryData;
   // this.checkedValue.patchValue({ hB: this.MandatoryList[0].hb });
    this.updateFormControls();
  })
}

//mandatory section ends
//Diagnosis section starts

diagnosisData:ReferenceId;
DiagnosisList:any;

getPatientDiagnosedData(ref:any){
  this.sectionData.getDiagnosisRefIdData(ref).subscribe((res:any)=>{
    this.diagnosisData=res;
    console.log("====Diagnosis====="+JSON.stringify(this.diagnosisData));
    this.DiagnosisList=this.diagnosisData;
  })
}

//Diagnosis section ends

  


getPatientDetails(patientId:any){
  this.DataSearch.getMemberData(patientId).subscribe((res:any)=>{
this.showData=res;
console.log(this.showData);
  })
}


printButton=false;
  onSave(){

    var info=new ReferenceId();
    info.category='3';
    info.district=this.detailsData.district;
    info.facility=this.detailsData.facility;
    info.updatedDate=this.currentDate;
    
    info.patientId=this.detailsData.patientId;
    info.referenceId=this.detailsData.referenceId;

    info.hb=this.checkedValue.value.hb;
    info.tlc=this.checkedValue.value.tlc;
    info.neutrophils=  this.checkedValue.value.neutrophils;
    info.lymphocytes=  this.checkedValue.value.lymphocytes;
    info.monocytes=  this.checkedValue.value.monocytes;
    info.eosinophils=  this.checkedValue.value.eosinophils;
    info.basophils=  this.checkedValue.value.basophils;
    info.packedCellVolume=  this.checkedValue.value.packedCellVolume;
    info.meanCorpusVolume=  this.checkedValue.value.meanCorpuscularVolume;
    info.meanCorpusHemoglobin=  this.checkedValue.value.meanCorpuscularHemoglobin;
    info.meanCorpusHemoglobinConcentration=  this.checkedValue.value.meanCorpuscularHemoglobinConcentration;
    info.platletCount=  this.checkedValue.value.pletelet;
    info.rdwCv=  this.checkedValue.value.rdwcv;
    info.rdwSd=  this.checkedValue.value.rdwsd;
    info.rbcCount=  this.checkedValue.value.rbc; 
    info.rbs=this.checkedValue.value.rbs;
    info.urineRoutineExamination=  this.checkedValue.value.urineRoutineExam;
    info.relevantInvestigation=this.checkedValue.value.relevantInvestigation;

    

    console.log(info);

    this.formD.addMandatoryInves(info).subscribe(data=>{
      this.obj=data;
      this.successfull = "*Patient Information Added Successfully!!";
      window.scrollTo(0,0);
      this.printButton=true;
      window.alert(this.successfull);
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
//ends


//already known check value

alreadyKnownChecks: boolean;
selected(e:any){
  if(e.target.checked==true){
    this.alreadyKnownChecks=true;
  }
  else{
    this.alreadyKnownChecks=false;
  }
  
}


//update form control

updateFormControls() {
  const formControls = this.checkedValue.controls;
  for (const property in this.MandatoryList[0]) {
    if (formControls[property]) {
      formControls[property].setValue(this.MandatoryList[0][property]);
    }
  }
}

}
