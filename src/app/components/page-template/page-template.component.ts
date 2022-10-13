import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.css']
})
export class PageTemplateComponent implements OnInit {

  sidenavOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }

}
