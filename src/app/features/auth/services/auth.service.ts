import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Login } from '../models/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ApiUrl = `${environment.baseApiUrl}/auth/login`;

  constructor(private httpClient: HttpClient) { }

  login(login: Login): Observable<Login> {
    return this.httpClient.post<Login>(this.ApiUrl, login);
  }
}
