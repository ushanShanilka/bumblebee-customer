export class OtpConfirmationDTO{
  email:string;
  otp:number;

  constructor(email: string, otp: number) {
    this.email = email;
    this.otp = otp;
  }
}
