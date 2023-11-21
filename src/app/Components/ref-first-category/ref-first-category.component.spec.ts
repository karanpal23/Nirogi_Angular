import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefFirstCategoryComponent } from './ref-first-category.component';

describe('RefFirstCategoryComponent', () => {
  let component: RefFirstCategoryComponent;
  let fixture: ComponentFixture<RefFirstCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefFirstCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefFirstCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
