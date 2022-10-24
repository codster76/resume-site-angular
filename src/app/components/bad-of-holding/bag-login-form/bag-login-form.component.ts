import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BagDetails } from 'src/app/model/data-model';

@Component({
  selector: 'app-bag-login-form',
  templateUrl: './bag-login-form.component.html',
  styleUrls: ['./bag-login-form.component.css']
})
export class BagLoginFormComponent implements OnInit {
  @Input() bagDetailsToDisplay: BagDetails = {
    bagName: '',
    bagPassword: ''
  };

  bagDetailsFormResults: FormGroup = new FormGroup({});

  @Output() formSubmittedEvent= new EventEmitter<BagDetails>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.bagDetailsFormResults = this.formBuilder.group({
      bagName: [this.bagDetailsToDisplay.bagName, [Validators.required]],
      bagPassword: [this.bagDetailsToDisplay.bagPassword, [Validators.required]],
    });
  }

  onSubmit() {
    this.formSubmittedEvent.emit(this.bagDetailsFormResults.value as BagDetails);
  }
}
