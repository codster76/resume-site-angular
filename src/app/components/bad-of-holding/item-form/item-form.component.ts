import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { Item } from 'src/app/model/data-model';

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
  @Input() modalID: string = '';

  itemFormResults: FormGroup = new FormGroup({});

  @Output() formSubmittedEvent= new EventEmitter<Item>();
  @Output() itemDeletedEvent = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder, public modalService: ModalService) {}

  ngOnInit(): void {
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

  cancelButton() {
    this.modalService.close(this.modalID);
    this.resetForm();
  }
}

type TypeOfForm = "add" | "edit";