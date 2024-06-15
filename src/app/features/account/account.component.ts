import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../core/components/sidebar/sidebar.component';
import { HeaderInfoComponent } from '../../shared/components/header-info/header-info.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { SubtitleComponent } from '../../shared/components/subtitle/subtitle.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AccountItemComponent } from './components/account-item/account-item.component';
import { MatDialog } from '@angular/material/dialog';
import { AccountModalComponent } from './components/account-modal/account-modal.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [SidebarComponent, HeaderInfoComponent, TitleComponent, SubtitleComponent, ButtonComponent, AccountItemComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  @ViewChild(AccountItemComponent) accountItemComponent!: AccountItemComponent;
  
  constructor(
    private matDialog: MatDialog
  ) {}

  openModalAccount() {
    const modalAccount = this.matDialog.open(AccountModalComponent);

    modalAccount.componentInstance.createAccountSucess.subscribe(() => {
      this.accountItemComponent.getAccounts();
    })
  }

}
