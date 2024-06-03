import { Component, Inject } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExpenseModalComponent } from '../../expense/components/expense-modal/expense-modal.component';
import { TitleComponent } from '../../../../shared/components/title/title.component';
import { SubtitleComponent } from '../../../../shared/components/subtitle/subtitle.component';
import { ExpenseService } from '../../expense/services/expense.service';

@Component({
  selector: 'app-modal-transaction',
  standalone: true,
  imports: [ButtonComponent, TitleComponent, SubtitleComponent],
  templateUrl: './modal-transaction.component.html',
  styleUrl: './modal-transaction.component.scss'
})
export class ModalTransactionComponent {
  
  constructor(
    private matDialog: MatDialog, 
    private dialogRef: MatDialogRef<ModalTransactionComponent>,
    private expenseService: ExpenseService
  ) {}

  openModalExpense(){
    this.dialogRef.close();

    const modalExpense = this.matDialog.open(ExpenseModalComponent);
  }
}
