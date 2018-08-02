import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ExpenseCategoryComponent } from './expense-category.component';


const ExpenseCategory_ROUTE = [
  { path: '', component: ExpenseCategoryComponent },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ExpenseCategory_ROUTE)
  ],
  declarations: [ExpenseCategoryComponent]
})
export class ExpenseCategoryModule { }
