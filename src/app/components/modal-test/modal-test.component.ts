import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalContentTestComponent } from '../modal-content-test/modal-content-test.component';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-modal-test',
  templateUrl: './modal-test.component.html',
  styleUrls: ['./modal-test.component.css']
})
export class ModalTestComponent implements OnInit {

  constructor(public dialogService: MatDialog) { }

  ngOnInit(): void {
  }

  openModal1() {
    let a = Math.max(((Math.min(window.innerWidth, 1920))/1920), 1);
    let dialogRef = this.dialogService.open(ModalContentTestComponent, { width: `${window.innerWidth/(2 - (1 - ((Math.min(window.innerWidth, 1920))/1920)))}px`, data: { title: "Title1", body: "thsretjsrtjsrjsrtjrjsrjsrtjsrtj" } });
    let testEvent = dialogRef.componentInstance.testEvent.subscribe((event: number) => {
      console.log(1 + event);
    });
    dialogRef.afterClosed().subscribe(() => {
      testEvent.unsubscribe();
    });
  }

  openModal2() {
    this.dialogService.open(ModalContentTestComponent, { width: '50%', data: { title: "Title2", body: "sfjgsjstjsrtjsrtjsrtjsrtj" } });
  }

  openImageModal() {
    let width = window.innerWidth/(2 - (1 - ((Math.min(window.innerWidth, 1920))/1920)));
    this.dialogService.open(ImageModalComponent, { width: `${width}px`, data: { imageUrl: "../../../assets/archie-ray-rowman.png", width: width } });
  }

}
