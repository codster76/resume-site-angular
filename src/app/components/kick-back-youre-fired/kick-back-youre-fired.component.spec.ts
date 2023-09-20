import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KickBackYoureFiredComponent } from './kick-back-youre-fired.component';

describe('KickBackYoureFiredComponent', () => {
  let component: KickBackYoureFiredComponent;
  let fixture: ComponentFixture<KickBackYoureFiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KickBackYoureFiredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KickBackYoureFiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
