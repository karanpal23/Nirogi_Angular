import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondCatogPreviewComponent } from './second-catog-preview.component';

describe('SecondCatogPreviewComponent', () => {
  let component: SecondCatogPreviewComponent;
  let fixture: ComponentFixture<SecondCatogPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondCatogPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondCatogPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
