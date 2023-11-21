import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefSecondCategoryComponent } from './ref-second-category.component';

describe('RefSecondCategoryComponent', () => {
  let component: RefSecondCategoryComponent;
  let fixture: ComponentFixture<RefSecondCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefSecondCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefSecondCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
