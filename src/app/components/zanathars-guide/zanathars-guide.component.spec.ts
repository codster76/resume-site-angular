import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZanatharsGuideComponent } from './zanathars-guide.component';

describe('ZanatharsGuideComponent', () => {
  let component: ZanatharsGuideComponent;
  let fixture: ComponentFixture<ZanatharsGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZanatharsGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZanatharsGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
