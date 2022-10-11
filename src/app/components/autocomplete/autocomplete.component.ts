import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Trie } from 'src/app/classes/trie.js';
import { sampleDataAsArray } from 'src/assets/SampleData';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit, OnDestroy {

  @ViewChild('textInput') input?: ElementRef;
  inputSubscription?: Subscription;

  constructor() {}

  ngAfterViewInit() {
    if(this.input) {
      this.inputSubscription = fromEvent(this.input.nativeElement, 'keyup').pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap((text) => console.log(this.input?.nativeElement.value))
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
      this.inputSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    console.log(sampleDataAsArray[0]);
  }

}
