import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefThirdCategoryComponent } from './ref-third-category.component';

describe('RefThirdCategoryComponent', () => {
  let component: RefThirdCategoryComponent;
  let fixture: ComponentFixture<RefThirdCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefThirdCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefThirdCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
