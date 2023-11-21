import { Component, OnInit } from '@angular/core';
import { MemberServiceService } from 'src/app/services/member-service.service';

@Component({
  selector: 'app-pending-lab-reports-alert',
  templateUrl: './pending-lab-reports-alert.component.html',
  styleUrls: ['./pending-lab-reports-alert.component.css']
})
export class PendingLabReportsAlertComponent implements OnInit {

  constructor(private memberService:MemberServiceService) { }
  userId=sessionStorage.getItem('username');

  ngOnInit() {
    this.getPendingReportCount(this.userId);
  }


  PendingReportsCount:any;
  getPendingReportCount(obj:any){
   console.log("userId-- "+this.userId)
   this.memberService.getPendingRecordCount(obj).subscribe((res:any)=>{
     console.log("inside ")
     this.PendingReportsCount=res;
     console.log("count of app--- "+res);

   })
  }

  refreshCount(){
    this.getPendingReportCount(this.userId);
  }

}
