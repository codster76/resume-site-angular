import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-content-test',
  templateUrl: './modal-content-test.component.html',
  styleUrls: ['./modal-content-test.component.css']
})
export class ModalContentTestComponent implements OnInit {

  @Output() testEvent = new EventEmitter<number>();

  onTestEvent() {
    this.testEvent.emit(3);
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, body: string}) { }

  ngOnInit(): void {
  }

}
