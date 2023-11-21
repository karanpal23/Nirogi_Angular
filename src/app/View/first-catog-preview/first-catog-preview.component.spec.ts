import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstCatogPreviewComponent } from './first-catog-preview.component';

describe('FirstCatogPreviewComponent', () => {
  let component: FirstCatogPreviewComponent;
  let fixture: ComponentFixture<FirstCatogPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstCatogPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstCatogPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
