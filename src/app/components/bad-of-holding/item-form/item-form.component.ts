import { Component, Input, Output, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Item } from 'src/app/model/data-model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  @Input() formType: TypeOfForm = "add";

  itemFormResults: FormGroup = new FormGroup({});

  @Output() formSubmittedEvent= new EventEmitter<Item>();
  @Output() itemDeletedEvent = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: {item: Item, formType: TypeOfForm}) {}

  ngOnInit(): void {
    this.itemToDisplay = this.data.item;

    this.itemFormResults = this.formBuilder.group({
      id: [this.itemToDisplay.id],
      name: [this.itemToDisplay.name, [Validators.required]],
      description: [this.itemToDisplay.description],
      value: [this.itemToDisplay.value],
      weight: [this.itemToDisplay.weight],
      quantity: [this.itemToDisplay.quantity]
    });

    this.formType = this.data.formType;
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
    this.formSubmittedEvent.emit(this.itemFormResults.value as Item);
  }

  onDelete() {
    this.itemDeletedEvent.emit(this.itemFormResults.value.id);
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
}

type TypeOfForm = "add" | "edit";