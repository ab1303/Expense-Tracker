import { Component, OnInit } from '@angular/core';
import { IExpenseCategory } from './expense-category';
import { ExpenseCategoryService } from './expense-category.service';

@Component({
  selector: 'expense-category',
  templateUrl: './expense-category.component.html',
  styleUrls: ['./expense-category.component.scss']
})
export class ExpenseCategoryComponent implements OnInit {

  expenseCategories: IExpenseCategory[] = [];
  constructor(private expenseCategoryService: ExpenseCategoryService) {}


  ngOnInit() {
    this.expenseCategoryService
    .getExpenseCategories()
    .subscribe((data) => {
      this.expenseCategories = data.expenseCategories;
    });

  }

}
