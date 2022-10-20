import { Component, ElementRef, Input, OnDestroy, OnInit, HostListener } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal2',
  templateUrl: './modal2.component.html',
  styleUrls: ['./modal2.component.css']
})
export class Modal2Component implements OnInit {
  @Input() id: string = '';
  @Input() width: number = 0;
  @Input() height: number = 0;
  @Input() distanceFromLeft: number = 0;
  @Input() distanceFromTop: number = 0;

  leftMargin: string = '0';
  rightMargin: string = '0';
  topMargin: string = '0';
  bottomMargin: string = '0';

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

    this.leftMargin = `${(this.distanceFromLeft)}px`;
    this.rightMargin = `${Math.max((window.innerWidth - this.distanceFromLeft - this.width), 0)}px`;

    this.topMargin = `${(this.distanceFromTop).toString()}px`;
    this.bottomMargin = `${Math.max((window.innerHeight - this.distanceFromTop - this.height), 0).toString()}px`;
  }

  // Resize the modal as the window changes in size
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.leftMargin = `${(this.distanceFromLeft)}px`;
    this.rightMargin = `${Math.max((window.innerWidth - this.distanceFromLeft - this.width), 0)}px`;

    this.topMargin = `${(this.distanceFromTop).toString()}px`;
    this.bottomMargin = `${Math.max((window.innerHeight - this.distanceFromTop - this.height), 0).toString()}px`;
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
