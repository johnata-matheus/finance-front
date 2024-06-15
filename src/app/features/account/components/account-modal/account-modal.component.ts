import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { TitleComponent } from '../../../../shared/components/title/title.component';
import { SubtitleComponent } from '../../../../shared/components/subtitle/subtitle.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Account } from '../../../transaction/expense/models/IAccount';

@Component({
  selector: 'app-account-modal',
  standalone: true,
  imports: [TitleComponent, SubtitleComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './account-modal.component.html',
  styleUrl: './account-modal.component.scss'
})
export class AccountModalComponent implements OnInit{

  @Output() createAccountSucess = new EventEmitter<any>();
  formAccount!: FormGroup;
  statusAccount: boolean = false;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AccountModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { account: Account } 
  ) {}

  ngOnInit(): void {
    this.formularioAccount();

    if(this.data && this.data.account) {
      this.formAccount.patchValue(this.data.account);
      this.statusAccount = true;
    }
  }

  formularioAccount() {
    this.formAccount = this.formBuilder.group({
      type: ['', Validators.required],
      balance: ['', Validators.required],
      title: ['', Validators.required]
    })
  }

  createAccount() {
    this.accountService.createUserAccount(this.formAccount.getRawValue()).subscribe({
      next: () => {
        this.dialogRef.close();
        this.statusAccount = false;
        this.createAccountSucess.emit();
      },
      error: () => console.error('deu ruim!') 
    })
  }

  updateAccount() {
    const updateAccount = { ...this.data.account, ...this.formAccount.getRawValue() }

    this.accountService.updateUserAccountById(updateAccount).subscribe({
      next: () => {
        this.dialogRef.close();
        this.statusAccount = true;
        this.createAccountSucess.emit();
      },
      error: error => console.error("erro: " + error)
    })
  }

}
