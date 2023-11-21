import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  hasAlerted: boolean = false;

  constructor() {}

  isAlerted(): boolean {
    return this.hasAlerted;
  }

  setAlerted(hasAlerted: boolean) {
    this.hasAlerted = hasAlerted;
  }
}
