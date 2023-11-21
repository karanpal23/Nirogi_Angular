import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FifthCatogComponent } from './fifth-catog.component';

describe('FifthCatogComponent', () => {
  let component: FifthCatogComponent;
  let fixture: ComponentFixture<FifthCatogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FifthCatogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FifthCatogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
