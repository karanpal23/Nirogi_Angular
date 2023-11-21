import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstCatogComponent } from './first-catog.component';

describe('FirstCatogComponent', () => {
  let component: FirstCatogComponent;
  let fixture: ComponentFixture<FirstCatogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstCatogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstCatogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
