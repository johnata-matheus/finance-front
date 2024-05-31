import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Expense } from '../../models/Expense';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../../../../shared/pipes/truncate.pipe';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalTransactionComponent } from '../../../components/modal-transaction/modal-transaction.component';
import { ExpenseModalComponent } from '../expense-modal/expense-modal.component';

@Component({
  selector: 'app-expense-table',
  standalone: true,
  imports: [CommonModule, TruncatePipe, ButtonComponent],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.scss'
})
export class ExpenseTableComponent implements OnChanges {

  expenses: Expense[] = [];
  
  constructor(
    private expenseService: ExpenseService,
    private matDialog: MatDialog
  ) {
    this.getExpenses()
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  openModalExpense(){
    const modalExpense = this.matDialog.open(ExpenseModalComponent);

    modalExpense.componentInstance.success.subscribe(() => {
      modalExpense.close();
    })
  }
    
  getExpenses(){
    this.expenseService.fetchUserExpenses();
    this.expenseService.getUserExpenses().subscribe({
      next: value => this.expenses = value,
      error: err => console.error("errooo!")
    });
  }
  
  getPaidStatus(isPaid: boolean): string {
    return isPaid ? "Pago" : "Não Pago";
  }


  onExpenseCreated(): void {
    this.getExpenses();
  }

}