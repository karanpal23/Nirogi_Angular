import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefFourthCategoryComponent } from './ref-fourth-category.component';

describe('RefFourthCategoryComponent', () => {
  let component: RefFourthCategoryComponent;
  let fixture: ComponentFixture<RefFourthCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefFourthCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefFourthCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
