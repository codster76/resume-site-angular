import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-ranker',
  templateUrl: './ranker.component.html',
  styleUrls: ['./ranker.component.css']
})
export class RankerComponent implements OnInit {

  constructor(public dialogService: MatDialog) { }

  ngOnInit(): void {
  }

  openImageModal(imageUrl: string) {
    let width = window.innerWidth/(2 - (1 - ((Math.min(window.innerWidth, 1920))/1920)));
    this.dialogService.open(ImageModalComponent, { width: `${width}px`, data: { imageUrl: imageUrl, width: width } });
  }
}
