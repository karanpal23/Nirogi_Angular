import { HttpClient } from '@angular/common/http';
import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './services/login.service';
import { Meta } from '@angular/platform-browser';
import { MemberServiceService } from './services/member-service.service';
import { DialogService } from './services/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('headerTemplate') headerFooterBody: ElementRef;
  @ViewChild('footer') footer: ElementRef;

  title: string = '';

  userId=sessionStorage.getItem('username');

  private isTabClosed: boolean = true;
  private isPageRefreshed: boolean = false;

  constructor(private loginService: LoginService, private router: Router,private http:HttpClient,private meta :Meta,private memberService:MemberServiceService,public dialogService:DialogService) {}

  ngOnInit(): void {


     // Set Content Security Policy header
     const cspValue = "your-csp-directive-value";
     this.meta.addTag({ name: 'Content-Security-Policy', content: `your-csp-directive-name ${cspValue}` });
   
    this.setHeader();

    this.getPendingReportCount(this.userId);
  }

 

  isLoggedIn(): boolean {
    let login = sessionStorage.getItem('token');
    return login !== undefined && login !== null && login !== '';
  }

  setHeader(): void {
    let path = this.router.url.split('/')[1];
    this.title = decodeURIComponent(path);
  }

  logOut(): void {
    this.loginService.logout();
    window.location.reload();
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



  openModal() {
    var data = null;//call api
    this.dialogService.openModal("Title1","Message Test", ()=>{
      //confirmed
      console.log('Yes');
    }, ()=>{
      //not confirmed
      console.log('No');
    });
  }
  
  
}
