import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

  formMode: 'SIGN UP' | 'VERIFIED' = 'SIGN UP';

  signUpForm!: FormGroup;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);


  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      confirmEmail: ['', Validators.required],
      nic: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      countryCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

}
