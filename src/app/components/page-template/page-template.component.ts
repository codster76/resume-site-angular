import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.css']
})
export class PageTemplateComponent implements OnInit {

  sidenavOpen: boolean = false;

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  viewportHeightToNumber(value: number) {
    return window.innerHeight/(value/100);
  }

  viewportWidthToNumber(value: number) {
    return window.innerWidth/(value/100);
  }

}
