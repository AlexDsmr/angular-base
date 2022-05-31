import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
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
superPowers = ['Super Speed', 'Levitation', 'Accelerated Healing', 'Gravity Control','Elasticity (Stretchy)']
isReqMail = true
isReqPhone = true



phoneHandler(){
  if(!this.profileForm.get('mail')?.value && this.profileForm.get('phone')?.value) {
    this.isReqMail = true
    this.isReqPhone = true
  }  

  if (this.profileForm.get('phone')?.value) {
    this.profileForm.get('phone')?.setValidators([Validators.required, allowedNameValidator(/^([+]?[0-9\s-\(\)]{3,25})*$/i)])
    this.isReqPhone = true
  }

  if (this.profileForm.get('phone')?.status === "VALID" && !this.profileForm.get('mail')?.value){
    this.profileForm.get('mail')?.clearValidators()
    this.isReqMail = false
  } else {
    this.profileForm.get('mail')?.setValidators([Validators.required, allowedNameValidator(/.+@.+\..+/i)])
    this.isReqMail = true
  }

    if(this.profileForm.get('mail')?.status === "VALID" && !this.profileForm.get('phone')?.value) {
      this.profileForm.get('phone')?.clearValidators()
      this.isReqPhone = false
    }

  this.profileForm.get('mail')?.updateValueAndValidity()
  this.profileForm.get('phone')?.updateValueAndValidity()
}

mailHandler(){
  if(!this.profileForm.get('mail')?.value && this.profileForm.get('phone')?.value) {
    this.isReqMail = true
    this.isReqPhone = true
  }  

  if (this.profileForm.get('mail')?.value) {
    this.profileForm.get('mail')?.setValidators([Validators.required, allowedNameValidator(/.+@.+\..+/i)])
    this.isReqMail = true
  }

  if(this.profileForm.get('mail')?.status === "VALID" && !this.profileForm.get('phone')?.value) {
    this.profileForm.get('phone')?.clearValidators()
    this.isReqPhone = false
  } else {
    this.profileForm.get('phone')?.setValidators([Validators.required, allowedNameValidator(/^([+]?[0-9\s-\(\)]{3,25})*$/i)])
    this.isReqPhone = true
  }
    if(this.profileForm.get('phone')?.status === "VALID" && !this.profileForm.get('mail')?.value) {
      this.profileForm.get('mail')?.clearValidators()
      this.isReqMail = false
    }

    this.profileForm.get('mail')?.updateValueAndValidity()
    this.profileForm.get('phone')?.updateValueAndValidity()
}

profileForm = this.fb.group({
  name: ['', Validators.required], 
  alias: [null],
  location: ['', Validators.required],
  equipment: [''],
  superPower: ['', Validators.required],
  mail: [null, [Validators.required, allowedNameValidator(/.+@.+\..+/i)]],
  phone: [null, [Validators.required, allowedNameValidator(/^([+]?[0-9\s-\(\)]{3,25})*$/i)]]
});




onSubmit() {
  // TODO: Use EventEmitter with form value
  
  console.log(this.profileForm.value);
}



}
