import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) {}

  open(content: any) {
    return this.modalService.open(content);
  }

  close(content: any) {
    return this.modalService.dismissAll(content);
  }
}
