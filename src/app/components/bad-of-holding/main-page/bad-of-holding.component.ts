import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendCallsService } from 'src/app/services/backend-calls.service';
import { Item } from 'src/app/model/data-model';
import { map, Observable, tap, BehaviorSubject, Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

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
    name: [(a: Item, b: Item) => a.name.localeCompare(b.name), (a: Item, b: Item) => b.name.localeCompare(a.name)],
    description: [(a: Item, b: Item) => a.description.localeCompare(b.description), (a: Item, b: Item) => b.description.localeCompare(a.description)],
    value: [(a: Item, b: Item) => a.value - b.value, (a: Item, b: Item) => b.value - a.value],
    weight: [(a: Item, b: Item) => a.weight - b.weight, (a: Item, b: Item) => b.weight - a.weight],
    quantity: [(a: Item, b: Item) => a.quantity - b.quantity, (a: Item, b: Item) => b.quantity - a.quantity]
  }
  lastSort: string = '';

  constructor(public backendCalls: BackendCallsService, public modalService: ModalService) { }

  ngOnInit(): void {
    this.itemSubscription = this.backendCalls.getItemList().subscribe((value) => this.itemSubject.next(value));
  }

  ngOnDestroy(): void {
    this.itemSubscription.unsubscribe();
  }

  sortBy(sortingType: string) {
    if(this.lastSort !== sortingType) {
      this.itemSubject.next(this.itemSubject.getValue().sort(this.sortingFunctions[sortingType as keyof typeof this.sortingFunctions][0]));
      this.lastSort = sortingType;
    } else {
      this.itemSubject.next(this.itemSubject.getValue().sort(this.sortingFunctions[sortingType as keyof typeof this.sortingFunctions][1]));
      this.lastSort = '';
    }
  }

  addNewItem(itemToAdd: Item) {
    this.backendCalls.addItem(itemToAdd);
    // Add to display
    this.itemSubject.getValue().push(itemToAdd);
  }

  editItem(itemToUpdateWith: Item, IDOfItemToReplace: string) {
    this.backendCalls.updateItem(itemToUpdateWith, IDOfItemToReplace);
    this.itemSubject.getValue().map((item) => {
      if(item.id === IDOfItemToReplace) {
        item.name = itemToUpdateWith.name;
        item.description = itemToUpdateWith.description;
        item.value = itemToUpdateWith.value;
        item.quantity = itemToUpdateWith.quantity;
        item.weight = itemToUpdateWith.weight;
      }
    })
    this.modalService.close(IDOfItemToReplace);
  }

  deleteItem(idToDelete: string) {
    this.backendCalls.deleteItem(idToDelete);
    // Delete from display
    this.itemSubject.next(this.itemSubject.getValue().filter(arrayItem => arrayItem.id !== idToDelete));
  }
}
