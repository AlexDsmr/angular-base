import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';


export function allowedNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const allowed = !nameRe.test(control.value);
    return allowed ? {allowedName: {value: control.value}} : null;
  };
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit{

constructor(private fb: FormBuilder) { }
ngOnInit(): void {
  this.profileForm.get('location')?.valueChanges.subscribe((location) => {
    console.log(location)
    this.changeEquip(location)
  });

  this.profileForm = new FormGroup({
    name: new FormControl(this.profileForm.value.name, [
      Validators.required,      
    ]),
    location: new FormControl(this.profileForm.value.location, [
      Validators.required,      
    ]),
  
    mail: new FormControl(this.profileForm.value.contact.mail, [
      Validators.required,
      allowedNameValidator(/.+@.+\..+/i)
    ]),
    phone: new FormControl(this.profileForm.value.contact.phone, [
      Validators.required,
      allowedNameValidator(/^([+]?[0-9\s-\(\)]{3,25})*$/i)
    ]),
  })


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
superPowers = ['Super Speed', 'Levitation', 'Accelerated Healing', 'Gravity Control','Elasticity (Stretchy)']

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
