import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagLoginFormComponent } from './bag-login-form.component';

describe('BagLoginFormComponent', () => {
  let component: BagLoginFormComponent;
  let fixture: ComponentFixture<BagLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BagLoginFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BagLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
