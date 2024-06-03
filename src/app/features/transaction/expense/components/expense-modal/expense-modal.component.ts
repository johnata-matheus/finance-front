import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../../models/Account';
import { ToastrService } from 'ngx-toastr';
import { Expense } from '../../models/Expense';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TitleComponent } from '../../../../../shared/components/title/title.component';
import { SubtitleComponent } from '../../../../../shared/components/subtitle/subtitle.component';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-expense-modal',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatDialogModule , ButtonComponent, ReactiveFormsModule, TitleComponent, SubtitleComponent],
  templateUrl: './expense-modal.component.html',
  styleUrl: './expense-modal.component.scss'
})
export class ExpenseModalComponent implements OnInit {
  success: EventEmitter<any> = new EventEmitter();
  formExpense!: FormGroup;
  accounts: Account[] = [];
  statusExpense: boolean = false;
  expenseStatusText: string = '';

  constructor(
    private expenseService: ExpenseService,
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef,
    private toastService: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: { expense: Expense },
  ) {}

  ngOnInit(): void {
    this.formularioExpense();
    this.getAccounts();

    if (this.data && this.data.expense) {
      this.formExpense.patchValue(this.data.expense);
      this.statusExpense = true; 
    }
  }

  formularioExpense() {
    this.formExpense = this.formBuilder.group({
      description: ['', Validators.required],
      value: ['', Validators.required],
      date: ['', Validators.required],
      id_account: [''],
      category: ['', Validators.required],
      paid_out: [false]
    });
  }

  createExpense() {
    if(this.formExpense.invalid){
      return;
    }

    this.expenseService.createUserExpense(this.formExpense.getRawValue()).subscribe({
      next: () => {
        this.dialogRef.close();
        this.toastService.success("Despesa criada com sucesso", '', { timeOut: 3000, progressBar: true })
      },
      error: () => this.toastService.error("Erro ao criar a despesa", '', { timeOut: 3000, progressBar: true })
    })
  }

  updateExpense() {
    if(this.formExpense.invalid){
      return;
    }

    const updatedExpense = { ...this.data.expense, ...this.formExpense.getRawValue() };

    this.expenseService.updateUserExpense(updatedExpense).subscribe({
      next: () => {
        this.dialogRef.close();
        this.toastService.success("Despesa editada com sucesso", '', { timeOut: 3000, progressBar: true })
      },
      error: () => this.toastService.error("Erro ao editar a despesa", '', { timeOut: 3000, progressBar: true })
    });
  }

  attfieldsExpense(expense: Expense) {
    this.formExpense.patchValue({
      description: expense.description,
      value: expense.value,
      date: expense.date,
      id_account: expense.id_account,
      category: expense.category,
      paid_out: expense.paid_out
    });
  }

  getAccounts() {
    this.expenseService.getUserAccounts().subscribe({
      next: (value) => {
        this.accounts = value
        
        if (this.accounts.length > 0) {
          this.formExpense.patchValue({
            id_account: this.accounts[0].id
          });
        }
      },
      error: error => console.error("accounts erro")
    })
  }

}
