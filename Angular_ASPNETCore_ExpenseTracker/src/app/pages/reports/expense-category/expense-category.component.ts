import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';

import { IExpenseCategory } from './expense-category';
import { ExpenseCategoryReportService } from './expense-category-report.service';

@Component({
  selector: 'app-expense-category',
  templateUrl: './expense-category.component.html',
  styleUrls: ['./expense-category.component.scss']
})
export class ExpenseCategoryComponent implements OnInit {
  expenseCategories: IExpenseCategory[] = [];
  rows = [];
  options: NgDateRangePickerOptions;

  constructor(
    private expenseCategoryReportService: ExpenseCategoryReportService
  ) { }

  ngOnInit() {
    this.options = {
	  theme: 'default',
	  range: 'tm',
	  dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	  presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
	  dateFormat: 'yMd',
	  outputFormat: 'DD/MM/YYYY',
	  startOfWeek: 1
  };
  
  this.expenseCategoryReportService.getExpenseCategories().subscribe(data => {
    // this.transactions = data.transactions;
    this.rows = data.expenseCategories;
  });

  }

}
