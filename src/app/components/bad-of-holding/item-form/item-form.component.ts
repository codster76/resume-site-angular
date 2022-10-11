import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { Item } from 'src/app/model/data-model';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  @Input() defaultItem: Item = {
    id: '',
    name: '',
    description: '',
    value: 0,
    weight: 0,
    quantity: 0,
  };

  itemFormResults: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, public modalService: ModalService) { }

  ngOnInit(): void {
    this.itemFormResults = this.formBuilder.group({
      id: [this.defaultItem.id],
      name: [this.defaultItem.name, [Validators.required]],
      description: [this.defaultItem.description],
      value: [this.defaultItem.value],
      weight: [this.defaultItem.weight],
      quantity: [this.defaultItem.quantity]
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

}
