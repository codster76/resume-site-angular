import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.css']
})
export class PageTemplateComponent implements OnInit {

  sidenavOpen: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }

}
