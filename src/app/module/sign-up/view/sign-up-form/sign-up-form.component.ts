import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/service/auth.service";
import {RegisterDTO} from "../../../../core/dto/RegisterDTO";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

  formMode: 'SIGN UP' | 'VERIFIED' = 'SIGN UP';

  apiResponse = true;

  signUpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService:AuthService) {}

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

  signUp() {
    if (this.signUpForm.valid){
      let registerDTO = new RegisterDTO(
        this.signUpForm.get('firstName')?.value,
        this.signUpForm.get('lastName')?.value,
        this.signUpForm.get('email')?.value,
        this.signUpForm.get('dateOfBirth')?.value,
        this.signUpForm.get('confirmEmail')?.value,
        this.signUpForm.get('nic')?.value,
        this.signUpForm.get('address')?.value,
        this.signUpForm.get('password')?.value,
        this.signUpForm.get('confirmPassword')?.value,
        this.signUpForm.get('countryCode')?.value,
        this.signUpForm.get('phoneNumber')?.value,
      );
      this.authService.signUp(registerDTO).subscribe(res => {
        if (res.code == 201){
          this.signUpForm.reset()
        }
      })

    }
  }
}
