import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FifthCatogPreviewComponent } from './fifth-catog-preview.component';

describe('FifthCatogPreviewComponent', () => {
  let component: FifthCatogPreviewComponent;
  let fixture: ComponentFixture<FifthCatogPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FifthCatogPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FifthCatogPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
