import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Expense } from '../models/Expense';
import { Account } from '../models/Account';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private readonly ApiUrl = `${environment.baseApiUrl}`;

  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  expenses$ = this.expensesSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  fetchUserExpenses(): void {
    this.httpClient.get<Expense[]>(`${this.ApiUrl}/expense/teste`)
      .subscribe(expenses => this.expensesSubject.next(expenses));
  }
  
  getUserExpenses(): Observable<Expense[]> {
    return this.expenses$;
  }
  
  createUserExpense(expense: Expense): Observable<Expense> {
    return this.httpClient.post<Expense>(`${this.ApiUrl}/expense`, expense)
      .pipe(
        tap(newExpense => {
          const currentExpenses = this.expensesSubject.value;
          this.expensesSubject.next([...currentExpenses, newExpense]);
        })
      );
  }

  updateUserExpense(expense: Expense): Observable<Expense> {
    return this.httpClient.put<Expense>(`${this.ApiUrl}/expense/${expense.id}`, expense)
      .pipe(
        tap(updatedExpense => {
          const currentExpenses = this.expensesSubject.value.map(expense => expense.id === updatedExpense.id ? updatedExpense : expense);
          this.expensesSubject.next(currentExpenses);
        })
      );
  }

  deleteUserExpense(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.ApiUrl}/expense/${id}`)
    .pipe(
      tap((deleteExpenseId) => {
        const currentExpense = this.expensesSubject.value.filter(expense => expense.id !== deleteExpenseId)
        this.expensesSubject.next(currentExpense);
      })
    );
  }
  
  getUserAccounts(): Observable<Account[]>{
    return this.httpClient.get<Account[]>(`${this.ApiUrl}/account`);
  }
}

