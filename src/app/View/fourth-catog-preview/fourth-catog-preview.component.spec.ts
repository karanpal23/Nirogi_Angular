import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthCatogPreviewComponent } from './fourth-catog-preview.component';

describe('FourthCatogPreviewComponent', () => {
  let component: FourthCatogPreviewComponent;
  let fixture: ComponentFixture<FourthCatogPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourthCatogPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourthCatogPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
