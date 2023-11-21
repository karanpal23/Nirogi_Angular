import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefFifthCategoryComponent } from './ref-fifth-category.component';

describe('RefFifthCategoryComponent', () => {
  let component: RefFifthCategoryComponent;
  let fixture: ComponentFixture<RefFifthCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefFifthCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefFifthCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
