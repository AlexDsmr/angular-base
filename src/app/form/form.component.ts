import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  name = new FormControl('');

  updateName() {
    this.name.setValue('Nancy');
  }

///////////////////////

profileForm = new FormGroup({
  firstName: new FormControl(''),
  lastName: new FormControl(''),
  address: new FormGroup({
    street: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl('')
  })
});

onSubmit() {
  // TODO: Use EventEmitter with form value
  console.warn(this.profileForm.value);
}

/////////////
  


}
