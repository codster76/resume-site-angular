import { Component, OnInit } from '@angular/core';
import { BackendCallsService } from 'src/app/services/backend-calls.service';
import { Item } from 'src/app/model/data-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bad-of-holding',
  templateUrl: './bad-of-holding.component.html',
  styleUrls: ['./bad-of-holding.component.css']
})
export class BadOfHoldingComponent implements OnInit {
  itemList: Item[] = [];
  itemObservable: Observable<Item[]> = this.getItems();

  constructor(public backendCalls: BackendCallsService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    return this.backendCalls.getItemList().pipe(
      // do stuff here
    );
  }

  doSomething() {
    this.itemList.sort((a, b) => a.name.localeCompare(b.name));
  }
}
