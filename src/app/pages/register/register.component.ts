import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { RegisterService } from '../../services/register.service';

import {Colonist} from '../../models/colonist';
import { ColonistService } from '../../services/colonist.service';

import {FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';


const canBe = (value: string): ValidatorFn => {
  return(control: AbstractControl) => {
     return control.value === value ? {'cant\'be this value': value}: null;
  };
};

const age = (tooYoung: number, tooOld: number): ValidatorFn => {
  if (tooYoung < 0 || tooOld < 0) {
    throw new Error('You can\'t be negative age...');
  }
  return (control: AbstractControl) => {
    return control.value < 0 || control.value < tooYoung || control.value > tooOld ?
      { 'You\'re not the right age...': age } : null;
  };
};
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService, ColonistService ]
})
export class RegisterComponent implements OnInit {
  public listJobs: Job[] = [];
  colonist: Colonist; 
  registerForm: FormGroup;
  jobs: Job[];
  NO_JOB_SELECTED = 'no job selected';
 
  constructor(private registerService: RegisterService,
              private colonistService : ColonistService,
              private formBuilder: FormBuilder,
              private router: Router) {   }


  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100), 
        Validators.minLength(3)
        ]),
      age: new FormControl('', [
        Validators.required, age(1, 105)]),
      job_id: new FormControl(this.NO_JOB_SELECTED, [canBe(this.NO_JOB_SELECTED)])
    });
    this.registerService.getData()  
        .subscribe((jobs) => {
          this.listJobs = jobs;
        });
  }
  
  

  register(e) {
    e.preventDefault();
    if(this.registerForm.invalid) {
      console.log('')
    } else {
    const name = this.registerForm.get('name').value;
    const age = this.registerForm.get('age').value;
    const job_id = this.registerForm.get('job_id').value;

    const colonist: Colonist = {name, age, job_id}
    this.colonistService
        .postData(colonist)
        .subscribe((data) => {
          localStorage.setItem('colonistIdNum', (data.colonist.id).toString());
          console.log(localStorage.getItem('colonistIdNum'));
          this.router.navigate (['/encounters']);
        });}
  } 
 

}

