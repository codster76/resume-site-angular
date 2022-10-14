import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtAndMusicComponent } from './art-and-music.component';

describe('ArtAndMusicComponent', () => {
  let component: ArtAndMusicComponent;
  let fixture: ComponentFixture<ArtAndMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtAndMusicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtAndMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
