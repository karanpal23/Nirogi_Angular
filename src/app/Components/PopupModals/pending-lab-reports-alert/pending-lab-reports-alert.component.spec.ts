import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingLabReportsAlertComponent } from './pending-lab-reports-alert.component';

describe('PendingLabReportsAlertComponent', () => {
  let component: PendingLabReportsAlertComponent;
  let fixture: ComponentFixture<PendingLabReportsAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingLabReportsAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingLabReportsAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
