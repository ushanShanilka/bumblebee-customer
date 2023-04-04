import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RegisterDTO} from "../dto/RegisterDTO";
import {Observable} from "rxjs";
import {OtpConfirmationDTO} from "../dto/OtpConfirmationDTO";

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  url = environment.baseUrl + 'otp';

  constructor(private httpClient: HttpClient) {}

  checkOtp(dto:OtpConfirmationDTO): Observable<any> {
    return this.httpClient.post(this.url , dto);
  }

  resendOtp(email:string): Observable<any> {
    return this.httpClient.get(this.url +"/resend", {
      params:new HttpParams()
        .append("email",email)
    });
  }
}
