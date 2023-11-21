import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SixthCatogComponent } from './sixth-catog.component';

describe('SixthCatogComponent', () => {
  let component: SixthCatogComponent;
  let fixture: ComponentFixture<SixthCatogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SixthCatogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SixthCatogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
