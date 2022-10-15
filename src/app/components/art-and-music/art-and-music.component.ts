import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-art-and-music',
  templateUrl: './art-and-music.component.html',
  styleUrls: ['./art-and-music.component.css']
})
export class ArtAndMusicComponent implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

}
