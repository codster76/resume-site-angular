import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pixel-borders',
  templateUrl: './pixel-borders.component.html',
  styleUrls: ['./pixel-borders.component.css']
})
export class PixelBordersComponent implements OnInit {

  @ViewChild('width') widthField?: ElementRef;
  @ViewChild('height') heightField?: ElementRef;
  @ViewChild('elementToModify') elementToModify?: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  modifyElement() {
    const width = Math.min(this.widthField?.nativeElement.value, window.innerWidth*0.77);
    const height = Math.min(this.heightField?.nativeElement.value, 1000);
    this.elementToModify!.nativeElement.style.width = `${width}px`;
    this.elementToModify!.nativeElement.style.height = `${height}px`;
  }

}
