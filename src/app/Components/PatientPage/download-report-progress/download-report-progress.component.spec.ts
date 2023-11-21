import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadReportProgressComponent } from './download-report-progress.component';

describe('DownloadReportProgressComponent', () => {
  let component: DownloadReportProgressComponent;
  let fixture: ComponentFixture<DownloadReportProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadReportProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadReportProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
