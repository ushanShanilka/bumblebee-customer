import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/service/auth.service";
import {RegisterDTO} from "../../../../core/dto/RegisterDTO";
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject, Observable} from "rxjs";
import {OtpService} from "../../../../core/service/otp.service";
import {OtpConfirmationDTO} from "../../../../core/dto/OtpConfirmationDTO";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

  formMode: 'SIGN-UP' | 'OTP Verification' = 'SIGN-UP';

  apiResponse = false;

  signUpForm!: FormGroup;
  verificationForm!: FormGroup;
  currentUser: string;

  constructor(private formBuilder: FormBuilder,
              private authService:AuthService,
              private toastrService:ToastrService,
              private otpService:OtpService) {

    this.currentUser = (JSON.parse(sessionStorage.getItem('email') as string))

  }

  ngOnInit(): void {

    if (this.currentUser != null){
      this.formMode = 'OTP Verification'
    }

    console.log(this.currentUser)

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


    this.verificationForm = this.formBuilder.group({
      one: ['', Validators.required],
      two: ['', Validators.required],
      tree: ['', Validators.required],
      four: ['', Validators.required],
      five: ['', Validators.required],
    });

  }

  signUp() {
    if (this.signUpForm.valid){
      this.apiResponse = true;
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
          sessionStorage.setItem('email', JSON.stringify(this.signUpForm.get('confirmEmail')?.value));
          this.signUpForm.reset()
          this.toastrService.success("Success")
          window.location.reload();
        }
      }, error => {
        console.log(error)
        this.toastrService.error(error.error.data)
      })
      setTimeout (() => {
        this.apiResponse = false;
      }, 10000);
    }
  }

  verified() {
    this.apiResponse = true;
    let s = this.verificationForm.get('one')?.value+""+this.verificationForm.get('two')?.value+""+this.verificationForm.get('tree')?.value+""+this.verificationForm.get('four')?.value+""+this.verificationForm.get('five')?.value;
    let otpConfirmationDTO = new OtpConfirmationDTO(
      this.currentUser,
      Number(s)
    );

    console.log(Number(s))
    this.otpService.checkOtp(otpConfirmationDTO).subscribe(res => {
      if (res.code == 200){
        this.toastrService.success("Success")
        sessionStorage.removeItem('email');
        window.location.reload();
      }
    }, error => {
      console.log(error)
      this.toastrService.error(error.error.data)
    })
    setTimeout (() => {
      this.apiResponse = false;
    }, 1000);
  }

  resendOtp() {
    this.apiResponse = true;
    this.otpService.resendOtp(this.currentUser).subscribe(res => {

      console.log(res)
      if (res.code == 200){
        this.toastrService.success("Success")
      }
    },error => {
      console.log(error)
      this.toastrService.error(error.error.data)
    })
    setTimeout (() => {
      this.apiResponse = false;
    }, 1000);
  }
}
