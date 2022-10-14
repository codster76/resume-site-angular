import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaManEchoesComponent } from './mega-man-echoes.component';

describe('MegaManEchoesComponent', () => {
  let component: MegaManEchoesComponent;
  let fixture: ComponentFixture<MegaManEchoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MegaManEchoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MegaManEchoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
