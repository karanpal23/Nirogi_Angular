import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthCatogComponent } from './fourth-catog.component';

describe('FourthCatogComponent', () => {
  let component: FourthCatogComponent;
  let fixture: ComponentFixture<FourthCatogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourthCatogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourthCatogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
