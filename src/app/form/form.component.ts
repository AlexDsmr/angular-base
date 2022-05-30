import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit{

constructor(private fb: FormBuilder) { }
ngOnInit(): void {
  this.profileForm.get('location')?.valueChanges.subscribe((location) => {
    this.changeEquip(location)
  });
}

changeEquip(location: string) {
  let equip = location == 'Russia'?'Bottle of vodka':
              location =='Europe'?'Frog and glass of beer':
              location =='Asia'?'A cup of rice':
              location =='America'?'Gamburger':
              'No equipment'

  this.profileForm.patchValue({equipment: equip})
}

locations = ['Russia', 'Europe', 'Asia', 'America', "Other"]

profileForm = this.fb.group({
  name: [''],
  alias: [''],
  location: [''],
  equipment: [''],
  superPower: [''],
  contact: this.fb.group({
    phone: [''],
    mail: [''],
  })
});


onSubmit() {
  // TODO: Use EventEmitter with form value
  
  console.log(this.profileForm.value);
}



}
