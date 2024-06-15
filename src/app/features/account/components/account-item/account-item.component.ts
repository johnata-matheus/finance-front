import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { IAccount } from '../../models/IAccount';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AccountModalComponent } from '../account-modal/account-modal.component';

import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Account } from '../../../transaction/expense/models/IAccount';
import { ModalDeleteComponent } from '../../../../shared/components/modal-delete/modal-delete.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-item',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule],
  templateUrl: './account-item.component.html',
  styleUrl: './account-item.component.scss'
})
export class AccountItemComponent implements OnInit {

  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  accounts: IAccount[] = [];

  constructor(
    private accountService: AccountService,
    private matDialog: MatDialog,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  openModalUpdateAccount(account: Account) {
    const accountModal = this.matDialog.open(AccountModalComponent, {
      data: { account }
    });

    accountModal.componentInstance.createAccountSucess.subscribe(() => {
      this.getAccounts();
    })
  }

  openModalDeleteAccount(id: number) {
    this.matDialog.open(ModalDeleteComponent, {
      data: { 
        id,
        title: "Excluir essa conta?",
        subtitle: "Esta ação é irreversível. Você irá excluir permanentemente a conta e suas transações associadas",
        deleteFunction: () => this.deleteAccount(id)
      }
    })
  }

  getAccounts() {
    this.accountService.getUserAccounts().subscribe({
      next: value => this.accounts = value,
      error: error => console.error("deu erro nas contas: " + error)
    })
  }

  deleteAccount(id: number) {
    this.accountService.deleteUserAccount(id).subscribe({
      next: () => {
        this.toastService.success("Conta deletada com sucesso", '', { timeOut: 3000, progressBar: true })
        this.getAccounts();
      },
      error: err => this.toastService.error("Erro ao deletar a conta", '', { timeOut: 3000, progressBar: true })
    })
  }
}
