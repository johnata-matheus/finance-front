import { Component } from '@angular/core';
import { SidebarComponent } from '../../core/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { SubtitleComponent } from '../../shared/components/subtitle/subtitle.component';
import { HeaderInfoComponent } from '../../shared/components/header-info/header-info.component';
import { SectionComponent } from './components/section/section.component';
import { ModalTransactionComponent } from './components/modal-transaction/modal-transaction.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, ButtonComponent, TitleComponent, SubtitleComponent, HeaderInfoComponent, SectionComponent, ModalTransactionComponent],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent {
  
  constructor(private matDialog: MatDialog){}

  openDialog(){
    this.matDialog.open(ModalTransactionComponent);
  }
}