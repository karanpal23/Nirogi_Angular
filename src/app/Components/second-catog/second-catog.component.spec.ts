import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondCatogComponent } from './second-catog.component';

describe('SecondCatogComponent', () => {
  let component: SecondCatogComponent;
  let fixture: ComponentFixture<SecondCatogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondCatogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondCatogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
