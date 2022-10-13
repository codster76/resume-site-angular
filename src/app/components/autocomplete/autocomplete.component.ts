import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BackendCallsService } from 'src/app/services/backend-calls.service';
import { merge } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit, OnDestroy {

  @ViewChild('textInput') input?: ElementRef;
  @ViewChild('numberOfSuggestions') numberOfSuggestions?: ElementRef;

  inputSubscription?: Subscription;
  numberChangeSubscription?: Subscription;
  autocompleteOptions: Observable<string[]> = this.backendCalls.getAutocomplete(' ',0);

  constructor(private backendCalls: BackendCallsService) {}

  ngAfterViewInit() {
    if(this.input) {
      this.inputSubscription = fromEvent(this.input.nativeElement, 'keyup').pipe(
        debounceTime(600),
        distinctUntilChanged()
      ).subscribe(() => {
        this.updateAutocomplete();
      });
    }

    if(this.numberOfSuggestions) {
      const changeObservable = fromEvent(this.numberOfSuggestions.nativeElement, 'change');
      const keyupObservable = fromEvent(this.numberOfSuggestions.nativeElement, 'keyup');

      const bothEvents = merge(changeObservable, keyupObservable);
      this.numberChangeSubscription = bothEvents.pipe(
        debounceTime(600),
        distinctUntilChanged()
      ).subscribe(() => {
        this.updateAutocomplete();
      });
    }
  }

  ngOnDestroy(): void {
      this.inputSubscription?.unsubscribe();
      this.numberChangeSubscription?.unsubscribe();
  }

  ngOnInit(): void {
  }

  updateAutocomplete() {
    if(this.input?.nativeElement.value === '') {
      this.autocompleteOptions = this.backendCalls.getAutocomplete(' ', this.numberOfSuggestions?.nativeElement.value);
    } else {
      this.autocompleteOptions = this.backendCalls.getAutocomplete(this.input?.nativeElement.value, this.numberOfSuggestions?.nativeElement.value);
    }
  }
}
