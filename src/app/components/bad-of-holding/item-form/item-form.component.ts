import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { Item } from 'src/app/model/data-model';
import { uid } from 'uid';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  @Input() itemToDisplay: Item = {
    id: '',
    name: '',
    description: '',
    value: 0,
    weight: 0,
    quantity: 0,
  };

  itemFormResults: FormGroup = new FormGroup({});

  // For opening and closing modals
  @Input() itemFormID: string = 'itemForm';

  @Output() formSubmittedEvent= new EventEmitter<Item>();

  constructor(private formBuilder: FormBuilder, public modalService: ModalService) {}

  ngOnInit(): void {
    console.log(this.itemFormID);
    this.itemFormResults = this.formBuilder.group({
      id: [this.itemToDisplay.id],
      name: [this.itemToDisplay.name, [Validators.required]],
      description: [this.itemToDisplay.description],
      value: [this.itemToDisplay.value],
      weight: [this.itemToDisplay.weight],
      quantity: [this.itemToDisplay.quantity]
    });
  }

  get id() {
    return this.itemFormResults.get('id');
  }

  get name() {
    return this.itemFormResults.get('name');
  }

  get description() {
    return this.itemFormResults.get('description');
  }

  get value() {
    return this.itemFormResults.get('value');
  }

  get weight() {
    return this.itemFormResults.get('weight');
  }

  get quantity() {
    return this.itemFormResults.get('quantity');
  }

  onSubmit() {
    this.itemFormResults.value.id = uid();
    this.formSubmittedEvent.emit(this.itemFormResults.value as Item);
  }

  resetForm() {
    this.itemFormResults = this.formBuilder.group({
      id: [this.itemToDisplay.id],
      name: [this.itemToDisplay.name, [Validators.required]],
      description: [this.itemToDisplay.description],
      value: [this.itemToDisplay.value],
      weight: [this.itemToDisplay.weight],
      quantity: [this.itemToDisplay.quantity]
    });
  }

  testFunction(id: string) {
    console.log(id);
  }
}