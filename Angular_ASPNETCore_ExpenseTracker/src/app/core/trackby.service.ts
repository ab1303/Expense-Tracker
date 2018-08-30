import { Injectable } from '@angular/core';

import { IUser } from '../pages/administration/users/user.model'
import { ExpenseCategory } from '../shared/model/domain/expense-category.model';
@Injectable()
export class TrackByService {
  
  expenseCateogry(index: number, expenseCategory: ExpenseCategory) {
    return expenseCategory.id;
  }

  user(index: number, user: IUser) {
    return user.id;
  }
  
}