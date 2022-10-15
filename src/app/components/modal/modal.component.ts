/*
Usage instructions:
1. In the component you wish to use modals in, add a public ModalService to the constructor.
2. Create the modal and make sure to fill out its fields <app-modal id='someName' [widthInPercent]="70" [heightInPercent]="90">

To open/close the modal from anywhere, just call the open/close method of the ModalService from the
constructor and pass the appropriate ID in.
*/

import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string = '';
  @Input() widthInPercent: number = 0;
  @Input() heightInPercent: number = 0;

  @Input() width: string = '100px';
  @Input() height: string = '100px';

  marginWidth: string = '70%';
  marginHeight: string = '90%';

  modalOpen = false;

  private element: any;

  constructor(private modalService: ModalService, private modalElement: ElementRef) {
    this.element = modalElement.nativeElement;
  }

  ngOnInit(): void {
    if (this.id === undefined) {
      console.error('Please give this modal an ID');
      return;
    }

    document.body.appendChild(this.element);

    this.modalService.add(this);

    if(this.widthInPercent > 0 && this.heightInPercent > 0) {
      this.marginWidth = `${(100 - this.widthInPercent) / 2}%`;
      this.marginHeight = `${(100 - this.heightInPercent) / 4}%`;
    } else {
      this.marginWidth = this.width;
      this.marginHeight = this.height;
    }
  }

  ngOnDestroy() {
    this.modalService.remove(this.id);
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }
}
