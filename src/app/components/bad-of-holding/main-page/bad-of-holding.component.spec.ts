import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadOfHoldingComponent } from './bad-of-holding.component';

describe('BadOfHoldingComponent', () => {
  let component: BadOfHoldingComponent;
  let fixture: ComponentFixture<BadOfHoldingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadOfHoldingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadOfHoldingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
