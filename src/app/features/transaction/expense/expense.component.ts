import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../core/components/sidebar/sidebar.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ExpenseTableComponent } from './components/expense-table/expense-table.component';
import { Observable } from 'rxjs';
import { Expense } from './models/IExpense';
import { ExpenseService } from './services/expense.service';



@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [SidebarComponent, ButtonComponent, ExpenseTableComponent],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {

}
