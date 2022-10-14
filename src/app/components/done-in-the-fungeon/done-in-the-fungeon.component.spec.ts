import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneInTheFungeonComponent } from './done-in-the-fungeon.component';

describe('DoneInTheFungeonComponent', () => {
  let component: DoneInTheFungeonComponent;
  let fixture: ComponentFixture<DoneInTheFungeonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoneInTheFungeonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoneInTheFungeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
