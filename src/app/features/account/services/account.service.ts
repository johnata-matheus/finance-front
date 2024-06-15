import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { IAccount } from '../models/IAccount';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly ApiUrl = `${environment.baseApiUrl}`;

  constructor(private httpClient: HttpClient) { }

  getUserAccounts(): Observable<IAccount[]> {
    return this.httpClient.get<IAccount[]>(`${this.ApiUrl}/account`);
  }

  createUserAccount(account: IAccount): Observable<IAccount> {
    return this.httpClient.post<IAccount>(`${this.ApiUrl}/account`, account);
  }

  updateUserAccountById(account: IAccount): Observable<IAccount> {
    return this.httpClient.put<IAccount>(`${this.ApiUrl}/account/${account.id}`, account);
  }

  deleteUserAccount(id: number): Observable<IAccount> {
    return this.httpClient.delete<IAccount>(`${this.ApiUrl}/account/${id}`);
  }
}
