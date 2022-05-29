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
});

}
