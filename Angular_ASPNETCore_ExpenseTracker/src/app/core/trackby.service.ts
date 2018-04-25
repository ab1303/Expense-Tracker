import { Injectable } from '@angular/core';

import { IExpenseCategory } from '../pages/administration/expense-category/expense-category'
@Injectable()
export class TrackByService {
  
  expenseCateogry(index: number, expenseCategory: IExpenseCategory) {
    return expenseCategory.id;
  }
  
}