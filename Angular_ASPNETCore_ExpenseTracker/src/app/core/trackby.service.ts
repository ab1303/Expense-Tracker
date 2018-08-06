import { Injectable } from '@angular/core';

import { IExpenseCategory } from '../pages/administration/expense-category/expense-category'
import { IUser } from '../pages/administration/users/user.model'
@Injectable()
export class TrackByService {
  
  expenseCateogry(index: number, expenseCategory: IExpenseCategory) {
    return expenseCategory.id;
  }

  user(index: number, user: IUser) {
    return user.id;
  }
  
}