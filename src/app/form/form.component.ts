import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

constructor(private fb: FormBuilder) { }

locations = ['Russia', 'Europe', 'Asia', 'America']

profileForm = this.fb.group({
  name: [''],
  alias: [''],
  location: [null],
  equipment: [''],
  superPower: [''],
  contact: this.fb.group({
    phone: [''],
    mail: [''],
  })
});

onSubmit() {
  // TODO: Use EventEmitter with form value
  console.warn(this.profileForm.value);
}

}
