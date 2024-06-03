import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Expense } from '../../models/Expense';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../../../../shared/pipes/truncate.pipe';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalTransactionComponent } from '../../../components/modal-transaction/modal-transaction.component';
import { ExpenseModalComponent } from '../expense-modal/expense-modal.component';
import { ToastrService } from 'ngx-toastr';
import { ModalDeleteComponent } from '../../../../../shared/components/modal-delete/modal-delete.component';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-expense-table',
  standalone: true,
  imports: [CommonModule, TruncatePipe, ButtonComponent, ExpenseModalComponent],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.scss'
})
export class ExpenseTableComponent implements OnInit {

  expenses: Expense[] = [];
  
  constructor(
    private expenseService: ExpenseService,
    private matDialog: MatDialog,
    private toastService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getExpenses();
  }

  openModalExpense() {
    this.matDialog.open(ExpenseModalComponent);
  }

  openModalEditExpense(expense: Expense) {
    this.matDialog.open(ExpenseModalComponent, {
      data: {expense}
    })
  }

  openModalDeleteExpense(id: number) {
    this.matDialog.open(ModalDeleteComponent, {
      data: {id}
    })
  }
    
  getExpenses(){
    this.expenseService.fetchUserExpenses();
    this.expenseService.getUserExpenses().subscribe({
      next: value => this.expenses = value
    });
  }
}