import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionComponent } from './transaction.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionComponent,
    children: [
      { path: '', redirectTo: 'expenses', pathMatch: 'full' },
      {
        path: 'expenses',
        loadComponent: () => import('../transaction/expense/expense.component').then((c) => c.ExpenseComponent )
      },
      {
        path: 'revenues',
        loadComponent: () => import('../transaction/revenue/revenue.component').then((c) => c.RevenueComponent )
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
