import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReferenceId } from 'src/app/classes/referenceId';
import { ApiService } from 'src/app/services/api.service';
import { FormSubmitService } from 'src/app/services/form-submit.service';
import { MemberServiceService } from 'src/app/services/member-service.service';

@Component({
  selector: 'app-ref-first-category',
  templateUrl: './ref-first-category.component.html',
  styleUrls: ['./ref-first-category.component.css']
})
export class RefFirstCategoryComponent implements OnInit{

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

  historyData={
    referenceId:''
   }

   checkedValue:FormGroup;
  constructor(private router:Router,private formD:FormSubmitService,private DataSearch:MemberServiceService,private sectionData:ApiService,private fb:FormBuilder) {
    this.checkedValue=this.fb.group({
      hb:'',
      relevantInvestigation:'',
    });
   }

   reqData={
    memberId:''
   }
  

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
    
    this.viewFlag=this.detailsData.viewFlag;
    console.log("reference :")
    console.log(this.detailsData);
    this.memberId=this.detailsData.patientId;
    this.refDistrict=this.detailsData.district;
    this.refFacility=this.detailsData.facility;
    this.referenceId=this.detailsData.referenceId;
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
      }
      else{
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
    info.district=this.detailsData.district;
    info.facility=this.detailsData.facility;
    info.category='1';
    info.patientId=this.detailsData.patientId;
    info.referenceId=this.detailsData.referenceId;
    info.updatedDate=this.currentDate;
    
    info.hb=this.checkedValue.value.hb;
    info.relevantInvestigation=this.checkedValue.value.relevantInvestigation;

    console.log(info);

    this.formD.addMandatoryInves(info).subscribe(data=>{
      this.obj=data;
      
    });

    this.successfull = "*Patient Information Added Successfully!!";
    window.scrollTo(0,0);
    this.printButton=true; 
    window.alert(this.successfull);
      
  
  }

  onCancel(){
    this.router.navigate(['/']);
  }

  updateFormControls() {
    const formControls = this.checkedValue.controls;
    for (const property in this.MandatoryList[0]) {
      if (formControls[property]) {
        formControls[property].setValue(this.MandatoryList[0][property]);
      }
    }
  }

}