import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelBordersComponent } from './pixel-borders.component';

describe('PixelBordersComponent', () => {
  let component: PixelBordersComponent;
  let fixture: ComponentFixture<PixelBordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PixelBordersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PixelBordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
