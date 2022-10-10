import { Component, OnInit } from '@angular/core';
import { Trie } from 'src/app/classes/trie.js';
import { sampleDataAsArray } from 'src/assets/SampleData';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  searchDebounce = new Subject<string>();
  input: string = "";

  constructor() {
    this.searchDebounce.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => (
      // Perform search
      console.log(value)
    ));
  }

  ngOnInit(): void {
    console.log(sampleDataAsArray[0]);
  }

}
