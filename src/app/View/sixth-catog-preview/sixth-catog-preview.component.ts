import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sixth-catog-preview',
  templateUrl: './sixth-catog-preview.component.html',
  styleUrls: ['./sixth-catog-preview.component.css']
})
export class SixthCatogPreviewComponent implements OnInit {
  patientRecord:any;
  patientMemberId:any;

  //home page selection data
  detailsStringData:any=sessionStorage.getItem('navigationExtra');
  detailsData=JSON.parse(this.detailsStringData);

  constructor(private apiService:ApiService,private router:Router) { 
    this.patientRecord={
      "Patient": [
          {
              "data": {
                  "id": 138534,
                  "pppId": "4SFJ6424",
                  "memberId": "HEKE6655",
                  "batchId": null,
                  "firstname": "ARTI",
                  "lastname": "",
                  "createdDate": null,
                  "fatherHusbandFirstname": "BIKHARI",
                  "fatherHusbandLastname": "LAL",
                  "blockTownCity": "PANCHKULA MC",
                  "wardVillage": "Ward 18",
                  "district": "PANCHKULA",
                  "income": 100000,
                  "flagCheck": "Yes",
                  "age": "31",
                  "dateOfBirth": null,
                  "gender": "female",
                  "mobileNo": "9815935306",
                  "address": "ASHIYANA,MADANPUR,ASHIYANA FLAT  POCKET-B panchkula-134116",
                  "districtLgd": null,
                  "blockLgd": null,
                  "wardLgd": null
              },
              "title": "Patient"
          }
      ],
      "Data": [
          {
              "data": {
                  "id": 1083331,
                  "patientId": "HEKE6655",
                  "district": "Ambala",
                  "facility": "DCH / Ambala",
                  "userId": "TestUserK",
                  "doctorId": 1868,
                  "category": "4",
                  "referenceId": "Am-D-HEKE6655989678",
                  "deliveryType": null,
                  "cryAfterBirth": null,
                  "histroyAdmIllness": null,
                  "historyFamily": null,
                  "immunStatus": null,
                  "familyHistoryIfYes": null,
                  "historyFeeding": null,
                  "contactWithTB": null,
                  "historyDeworming": null,
                  "milestones": null,
                  "createdDate": "2023-08-04T05:39:20.005Z",
                  "createdBy": "TestUser"
              },
              "title": "History"
          },
          {
              "data": {
                  "id": 914864,
                  "patientId": "HEKE6655",
                  "district": "Ambala",
                  "facility": "DCH / Ambala",
                  "userId": "TestUserK",
                  "doctorId": 1868,
                  "category": "4",
                  "createdDate": "2023-08-04T05:39:20.005Z",
                  "updatedDate": null,
                  "createdBy": "TestUser",
                  "referenceId": "Am-D-HEKE6655989678",
                  "neckHolding": null,
                  "socialSmile": null,
                  "sittingWithSupport": null,
                  "sittingWithoutSupport": null,
                  "standingWithoutSupport": null,
                  "standingWithSupport": null,
                  "pincerGrasp": null,
                  "strangerAnxiety": null,
                  "bisyllableSpeech": null,
                  "walkingWithoutSupport": null,
                  "speakFiveToTenWords": null,
                  "followSimpleDirection": null,
                  "walkStairsWithSupport": null,
                  "jumpWithBothFeet": null,
                  "scrabbling": null,
                  "speakAtleastFiftyWords": null
              },
              "title": "Milestones"
          },
          {
              "data": {
                  "id": 914863,
                  "patientId": "HEKE6655",
                  "district": "Ambala",
                  "facility": "DCH / Ambala",
                  "userId": "TestUserK",
                  "doctorId": 1868,
                  "referenceId": "Am-D-HEKE6655989678",
                  "category": "4",
                  "weight": "120",
                  "height": "90",
                  "headCircum": null,
                  "midArmCircum": null,
                  "pulseRate": "45",
                  "oxygenSaturation": null,
                  "pallor": "No",
                  "jaundice": "No",
                  "cyanosis": "No",
                  "heartRate": null,
                  "respiratoryRate": null,
                  "cappillaryRefillTime": null,
                  "pedalOedema": "No",
                  "congenitalAnomalies": null,
                  "anteriorFontanelle": null,
                  "hairTexture": null,
                  "skinTexture": null,
                  "skinTurgor": null,
                  "skinLesions": null,
                  "bloodPressure": "40/80",
                  "bmi": "148.15",
                  "wristWidening": null,
                  "vitADeficiency": null,
                  "gonadalExam": null,
                  "historyEarDischarge": null,
                  "speech": null,
                  "iq": null,
                  "clubbing": "No",
                  "lymphadenopathy": "No",
                  "createdDate": "2023-08-04T05:39:20.005Z",
                  "createdBy": "TestUser"
              },
              "title": "General Exam"
          },
          {
              "data": {
                  "id": 914844,
                  "patientId": "HEKE6655",
                  "doctorId": 1868,
                  "district": "Ambala",
                  "facility": "DCH / Ambala",
                  "userId": "TestUserK",
                  "category": "4",
                  "referenceId": "Am-D-HEKE6655989678",
                  "chest": "Normal",
                  "cvs": "Normal",
                  "perAbdomen": "Normal",
                  "cns": "Normal",
                  "hearing": "Normal",
                  "rightEye": "20",
                  "leftEye": "20",
                  "colorVision": "No",
                  "dentalExam": "Normal",
                  "genitalExam": "Normal",
                  "breastExam": "exam",
                  "jointExam": null,
                  "oralExam": null,
                  "movementOfEyeWithLight": null,
                  "createdDate": "2023-08-04T05:39:20.005Z",
                  "createdBy": "TestUser",
                  "eyeCongenitalCataract": null
              },
              "title": "Systemic Exam"
          },
          {
              "data": {
                  "id": 914801,
                  "patientId": "HEKE6655",
                  "district": "Ambala",
                  "facility": "DCH / Ambala",
                  "userId": "TestUserK",
                  "doctorId": 1868,
                  "category": "4",
                  "referenceId": "Am-D-HEKE6655989678",
                  "hb": null,
                  "relevantInvestigation": "",
                  "rbs": null,
                  "urineRoutineExam": "",
                  "serumCholesterol": null,
                  "rft": null,
                  "tsh": null,
                  "psa": null,
                  "neutrophils": null,
                  "lymphocytes": null,
                  "monocytes": null,
                  "eosinophils": null,
                  "basophils": null,
                  "createdDate": "2023-08-04T05:39:20.005Z",
                  "createdBy": "TestUser",
                  "updatedDate": null,
                  "sampleSent": "Yes",
                  "reportEntered": "No",
                  "packedCellVolume": null,
                  "meanCorpuscularHemoglobin": null,
                  "meanCorpuscularVolume": null,
                  "meanCorpuscularHemoglobinConcentration": null,
                  "rdwcv": null,
                  "tlc": null,
                  "rdwsd": null,
                  "rbc": null,
                  "papsmaear": null,
                  "serumCreatinine": null,
                  "bloodUrea": null,
                  "pletelet": null
              },
              "title": "Mandatory Investigation"
          },
          {
              "data": {
                  "id": 914801,
                  "patientId": "HEKE6655",
                  "category": "4",
                  "doctorId": 1868,
                  "createdDate": "2023-08-04T05:39:20.005Z",
                  "createdBy": "TestUser",
                  "district": "Ambala",
                  "facility": "DCH / Ambala",
                  "prescription": "Pressure ",
                  "userId": "TestUserK",
                  "referenceId": "Am-D-HEKE6655989678",
                  "diagnosed": "none",
                  "alreadyKnown": "yes"
              },
              "title": "Diagnosis"
          }
      ]
  }
  }

  ngOnInit(){
    this.patientMemberId=this.detailsData.memberId;
    this.getPatientData(this.patientMemberId);
  }

  getPatientData(memberId:any){
    console.log("memberId:   "+this.patientMemberId);
    this.apiService.getPatientAllDataByMemberId(memberId).subscribe({next:(res:any)=>{
      
      this.patientRecord=res;
      console.log(this.patientRecord);
      console.log("json---  "+JSON.stringify(this.patientRecord));
    },error: err => {
      console.log("Error:", err.status, err.statusText, err.error);
      alert(" error:  "+ err.status+" "+ err.statusText+" "+ err.error);
      // Display the error message to the user or update UI accordingly
    }}
    )
  }

  onCancel(){
    this.router.navigate(['/']);
  }

  //download form 
  downloadForm(event: Event) {
    event.preventDefault(); // Prevent the default navigation behavior

    const formHtml = document.querySelector('.container').outerHTML; // Get the HTML content

    const blob = new Blob([formHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'form.html'; // Specify the filename
    a.click();

    URL.revokeObjectURL(url);
  }

}
