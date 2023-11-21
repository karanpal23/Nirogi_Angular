import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css']
})
export class MyModalComponent implements OnInit {

  title: string = 'My Modal';
  body: string = 'This is the body of my modal.';
  message: string = '';
  hasAlerted: boolean = false;

  constructor(private router: Router,private modalService: ModalService,private alertService: AlertService) {}

  ngOnInit() {
  }

  open() {
    if (!this.alertService.isAlerted()) {
      this.message = 'Session expired or someone else is logged in with same credentials. please login again';
      this.alertService.setAlerted(true);
    }
  }

  close() {
    this.modalService.close(MyModalComponent);
  }

  login() {
    this.router.navigate(['/login']);
  }
}
