import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SixthCatogPreviewComponent } from './sixth-catog-preview.component';

describe('SixthCatogPreviewComponent', () => {
  let component: SixthCatogPreviewComponent;
  let fixture: ComponentFixture<SixthCatogPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SixthCatogPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SixthCatogPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
