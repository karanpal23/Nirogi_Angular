import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefSixthCategoryComponent } from './ref-sixth-category.component';

describe('RefSixthCategoryComponent', () => {
  let component: RefSixthCategoryComponent;
  let fixture: ComponentFixture<RefSixthCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefSixthCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefSixthCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
