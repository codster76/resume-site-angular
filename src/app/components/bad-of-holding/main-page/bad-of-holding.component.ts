import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendCallsService } from 'src/app/services/backend-calls.service';
import { Item } from 'src/app/model/data-model';
import { map, Observable, tap, BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-bad-of-holding',
  templateUrl: './bad-of-holding.component.html',
  styleUrls: ['./bad-of-holding.component.css']
})
export class BadOfHoldingComponent implements OnInit, OnDestroy {
  defaultItem: Item = {
    id: '',
    name: '',
    description: '',
    value: 0,
    weight: 0,
    quantity: 0
  }
  itemSubject: BehaviorSubject<Item[]> = new BehaviorSubject([this.defaultItem]);
  itemSubscription: Subscription = new Subscription;
  sortingFunctions = {
    nameAscending: (a: Item, b: Item) => a.name.localeCompare(b.name),
    nameDescending: (a: Item, b: Item) => b.name.localeCompare(a.name),
    descriptionAscending: (a: Item, b: Item) => a.description.localeCompare(b.description),
    descriptionDescending: (a: Item, b: Item) => b.description.localeCompare(a.description),
    valueAscending: (a: Item, b: Item) => a.value - b.value,
    valueDescending: (a: Item, b: Item) => b.value - a.value,
    weightAscending: (a: Item, b: Item) => a.weight - b.weight,
    weightDescending: (a: Item, b: Item) => b.weight - a.weight,
    quantityAscending: (a: Item, b: Item) => a.quantity - b.quantity,
    quantityDescending: (a: Item, b: Item) => b.quantity - a.quantity,
  }

  constructor(public backendCalls: BackendCallsService) { }

  ngOnInit(): void {
    this.itemSubscription = this.backendCalls.getItemList().subscribe((value) => this.itemSubject.next(value));
  }

  ngOnDestroy(): void {
    this.itemSubscription.unsubscribe();
  }

  sortBy(sortingType: string) {
    this.itemSubject.next(this.itemSubject.getValue().sort(this.sortingFunctions[sortingType as keyof typeof this.sortingFunctions]));
  }

  addNewItem() {
    const newItem: Item = {
      id: '2352352345',
      name: 'test',
      description: 'testdesc',
      value: 1,
      weight: 1,
      quantity: 1
    }
    this.backendCalls.addItem(newItem);
    // Add to display
    this.itemSubject.getValue().push(newItem);
  }

  deleteItem(idToDelete: string) {
    this.backendCalls.deleteItem(idToDelete);
    // Delete from display
    this.itemSubject.next(this.itemSubject.getValue().filter(arrayItem => arrayItem.id !== idToDelete));
  }
}
