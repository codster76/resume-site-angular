import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContentTestComponent } from './modal-content-test.component';

describe('ModalContentTestComponent', () => {
  let component: ModalContentTestComponent;
  let fixture: ComponentFixture<ModalContentTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalContentTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalContentTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
