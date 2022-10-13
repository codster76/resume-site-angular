import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { BackendCallsService } from 'src/app/services/backend-calls.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit, OnDestroy {

  @ViewChild('textInput') input?: ElementRef;
  @ViewChild('numberOfSuggestions') numberOfSuggestions?: ElementRef;

  inputSubscription?: Subscription;
  autocompleteOptions: Observable<string[]> = this.backendCalls.getAutocomplete(' ',0);

  constructor(private backendCalls: BackendCallsService) {}

  ngAfterViewInit() {
    if(this.input) {
      this.inputSubscription = fromEvent(this.input.nativeElement, 'keyup').pipe(
        debounceTime(600),
        distinctUntilChanged()
      ).subscribe((data) => {
        if(this.input?.nativeElement.value === '') {
          this.autocompleteOptions = this.backendCalls.getAutocomplete(' ', this.numberOfSuggestions?.nativeElement.value);
        } else {
          this.autocompleteOptions = this.backendCalls.getAutocomplete(this.input?.nativeElement.value, this.numberOfSuggestions?.nativeElement.value);
        }
      });
    }
  }

  ngOnDestroy(): void {
      this.inputSubscription?.unsubscribe();
  }

  ngOnInit(): void {
  }
}
