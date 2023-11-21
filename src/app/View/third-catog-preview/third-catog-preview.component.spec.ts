import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdCatogPreviewComponent } from './third-catog-preview.component';

describe('ThirdCatogPreviewComponent', () => {
  let component: ThirdCatogPreviewComponent;
  let fixture: ComponentFixture<ThirdCatogPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdCatogPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdCatogPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
