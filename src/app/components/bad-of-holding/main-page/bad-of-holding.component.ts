import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendCallsService } from 'src/app/services/backend-calls.service';
import { Item } from 'src/app/model/data-model';
import { map, Observable, tap, BehaviorSubject, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ItemFormComponent } from '../item-form/item-form.component'; 

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

  itemList: Item[] = [this.defaultItem];

  itemSubject: BehaviorSubject<Item[]> = new BehaviorSubject([this.defaultItem]);
  itemSubscription: Subscription = new Subscription;
  sortingFunctions = {
    name: [(a: Item, b: Item) => a.name.localeCompare(b.name), (a: Item, b: Item) => b.name.localeCompare(a.name)],
    description: [(a: Item, b: Item) => a.description.localeCompare(b.description), (a: Item, b: Item) => b.description.localeCompare(a.description)],
    value: [(a: Item, b: Item) => a.value - b.value, (a: Item, b: Item) => b.value - a.value],
    weight: [(a: Item, b: Item) => a.weight - b.weight, (a: Item, b: Item) => b.weight - a.weight],
    quantity: [(a: Item, b: Item) => a.quantity - b.quantity, (a: Item, b: Item) => b.quantity - a.quantity]
  }
  lastSort: string[] = ['', ''];

  currentDialog?: MatDialogRef<ItemFormComponent, any>;

  constructor(public backendCalls: BackendCallsService, public dialogService: MatDialog) { }

  ngOnInit(): void {
    this.getAllItems();
  }

  async getAllItems() {
    try {
      this.itemList = await this.backendCalls.getItemList();
      this.itemSubject.next(this.itemList);
    } catch (e) {
      console.error("Could not fetch quotes");
    }
  }

  ngOnDestroy(): void {
    this.itemSubscription.unsubscribe();
  }

  sortBy(sortingType: string) {
    // If the column is unsorted
    if(this.lastSort[0] !== sortingType) {
      this.itemSubject.next(this.itemSubject.getValue().sort(this.sortingFunctions[sortingType as keyof typeof this.sortingFunctions][0]));
      this.lastSort = [sortingType, 'ascending'];
    } else {
      // If the column is sorted, toggle between ascending and descending
      if(this.lastSort[1] === 'ascending') {
        this.itemSubject.next(this.itemSubject.getValue().sort(this.sortingFunctions[sortingType as keyof typeof this.sortingFunctions][1]));
        this.lastSort = [sortingType, 'descending'];
      } else {
        this.itemSubject.next(this.itemSubject.getValue().sort(this.sortingFunctions[sortingType as keyof typeof this.sortingFunctions][0]));
        this.lastSort = [sortingType, 'ascending'];
      }
    }
  }

  addNewItem(itemToAdd: Item) {
    this.backendCalls.addItem(itemToAdd);
    // Add to display
    this.itemSubject.getValue().push(itemToAdd);
    this.currentDialog?.close();
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
    this.currentDialog?.close();
  }

  deleteItem(idToDelete: string) {
    this.backendCalls.deleteItem(idToDelete);
    // Delete from display
    this.itemSubject.next(this.itemSubject.getValue().filter(arrayItem => arrayItem.id !== idToDelete));
    this.currentDialog?.close();
  }

  // Adds sorting icons to headings based on the last sort performed
  generateHeading(headingName: string) {
    if(headingName === this.lastSort[0]) {
      if(this.lastSort[1] === 'ascending') {
        return headingName.charAt(0).toUpperCase() + headingName.slice(1) + "↑";
      } else {
        return headingName.charAt(0).toUpperCase() + headingName.slice(1) + "↓";
      }
    } else {
      return headingName.charAt(0).toUpperCase() + headingName.slice(1);
    }
  }

  openModal(item: Item, formType: string) {
    this.currentDialog = this.dialogService.open(ItemFormComponent, { data: { item: item, formType: formType } });

    const formSubmit = this.currentDialog.componentInstance.formSubmittedEvent.subscribe((event: Item) => {
      if(this.currentDialog!.componentInstance.formType === "add") {
        this.addNewItem(event);
      } else {
        this.editItem(event, item.id);
      }
    });

    const itemDeleted = this.currentDialog.componentInstance.itemDeletedEvent.subscribe((event: string) => {
      this.deleteItem(event);
    });

    this.currentDialog.afterClosed().subscribe(() => {
      formSubmit.unsubscribe();
      itemDeleted.unsubscribe();
    });
  }
}