import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExpenseCategoryComponent } from './expense-category.component';
import { SharedModule } from '../../../shared/shared.module';


const ExpenseCategory_ROUTE = [
    { path: '', component: ExpenseCategoryComponent },
];

@NgModule({
	  declarations: [ExpenseCategoryComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(ExpenseCategory_ROUTE)
    ]
  
})
export class ExpenseCategoryModule { }
