import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Hero, HeroService } from 'src/app/shared/hero.service';
import { DateService } from 'src/app/shared/date.service';


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

heroes: Hero[] = []

constructor(private fb: FormBuilder,
            public dateService: DateService,
            private heroService: HeroService) { }
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



phoneHandler(value: any){  
  if(this.profileForm.get('mail')?.value === '' && this.profileForm.get('phone')?.value === '') {
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
  if(this.profileForm.get('mail')?.value === '' && this.profileForm.get('phone')?.value === '') {
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
  alias: [''],
  location: ['', Validators.required],
  equipment: [''],
  superPower: ['', Validators.required],
  mail: ['', [Validators.required, allowedNameValidator(/.+@.+\..+/i)]],
  phone: ['', [Validators.required, allowedNameValidator(/^([+]?[0-9\s-\(\)]{3,25})*$/i)]]
});




onSubmit() {
  const hero: Hero = {
    name: this.profileForm.get('name')?.value,
    date: this.dateService.date.value.format('DD-MM-YYYY'),
    alias: this.profileForm.get('alias')?.value,
    location: this.profileForm.get('location')?.value,
    equipment: this.profileForm.get('equipment')?.value,
    superPower: this.profileForm.get('superPower')?.value,
    mail: this.profileForm.get('mail')?.value,
    phone: this.profileForm.get('phone')?.value
  }
  
  this.heroService.create(hero).subscribe(hero => {
    this.heroes.push(hero)
    this.profileForm.reset()
  }, err => console.error(err))
}

//remove(task: Task) {
//  this.tasksService.remove(task).subscribe(() => {
//    this.tasks = this.tasks.filter(t => t.id !== task.id)
//  }, err => console.error(err))
//
//  console.log(this.profileForm.value);
//}


}
