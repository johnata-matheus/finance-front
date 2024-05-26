import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/Expense';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-expense-table',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.scss'
})
export class ExpenseTableComponent implements OnInit {

  expenses: Expense[] = [];
  
  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.getExpenses();
  }
    
  getExpenses(){
    this.expenseService.getUserExpenses().subscribe({
      next: value => this.expenses = value,
      error: err => console.error("errooo!")
    });
  }
  
  getPaidStatus(isPaid: boolean): string {
    return isPaid ? "Pago" : "Não Pago";
  }
}