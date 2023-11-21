import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdCatogComponent } from './third-catog.component';

describe('ThirdCatogComponent', () => {
  let component: ThirdCatogComponent;
  let fixture: ComponentFixture<ThirdCatogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdCatogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdCatogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
