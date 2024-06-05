import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Expense } from '../../../features/transaction/expense/models/IExpense';
import { ExpenseService } from '../../../features/transaction/expense/services/expense.service';
import { ToastrService } from 'ngx-toastr';
import { DialogRef } from '@angular/cdk/dialog';
import { TitleComponent } from '../title/title.component';
import { SubtitleComponent } from '../subtitle/subtitle.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [TitleComponent, SubtitleComponent, ButtonComponent],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.scss'
})
export class ModalDeleteComponent {
  success: EventEmitter<any> = new EventEmitter();

  constructor(
    private expenseService: ExpenseService,
    private toastService: ToastrService,
    private dialogRef: DialogRef,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }
  ) { }

  deleteExpense() {
    const expenseId = this.data.id;
    this.expenseService.deleteUserExpense(expenseId).subscribe({
      next: () => {
        this.dialogRef.close()
        this.toastService.success("Despesa deletada com sucesso", '', { timeOut: 3000, progressBar: true })
        this.expenseService.fetchUserExpenses();
      },
      error: err => this.toastService.error("Erro ao deletar a despesa", '', { timeOut: 3000, progressBar: true })
    })
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
