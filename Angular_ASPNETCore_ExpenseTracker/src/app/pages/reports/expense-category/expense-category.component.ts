import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';

@Component({
  selector: 'app-expense-category',
  templateUrl: './expense-category.component.html',
  styleUrls: ['./expense-category.component.scss']
})
export class ExpenseCategoryComponent implements OnInit {
  options: NgDateRangePickerOptions;

  constructor() { }

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
  }

}
