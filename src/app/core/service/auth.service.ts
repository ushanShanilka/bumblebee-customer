import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {RegisterDTO} from "../dto/RegisterDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.authUrl + '/users';

  constructor(private httpClient: HttpClient) {}

  signUp(dto:RegisterDTO): Observable<any> {
    return this.httpClient.post(this.url + '/signup', dto);
  }
}
