import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-art-and-music',
  templateUrl: './art-and-music.component.html',
  styleUrls: ['./art-and-music.component.css']
})
export class ArtAndMusicComponent implements OnInit {

  constructor(public dialogService: MatDialog) { }

  ngOnInit(): void {
  }

  openImageModal(imageUrl: string) {
    let width = window.innerWidth/(2 - (1 - ((Math.min(window.innerWidth, 1920))/1920)));
    this.dialogService.open(ImageModalComponent, { width: `${width}px`, data: { imageUrl: imageUrl, width: width } });
  }

}
