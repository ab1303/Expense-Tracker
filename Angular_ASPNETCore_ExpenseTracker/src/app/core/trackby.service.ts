import { Injectable } from '@angular/core';

import { IUser } from '../pages/administration/users/user.model'
import { ExpenseCategory } from '../pages/administration/expense-category/types/expense-category.model';
@Injectable()
export class TrackByService {
  
  expenseCateogry(index: number, expenseCategory: ExpenseCategory) {
    return expenseCategory.id;
  }

  user(index: number, user: IUser) {
    return user.id;
  }
  
}