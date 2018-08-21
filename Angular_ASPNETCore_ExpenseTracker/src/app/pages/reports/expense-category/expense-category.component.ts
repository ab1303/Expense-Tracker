import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';

import { ExpenseCategoryReportService } from './expense-category-report.service';

@Component({
  selector: 'app-expense-category',
  templateUrl: './expense-category.component.html',
  styleUrls: ['./expense-category.component.scss']
})
export class ExpenseCategoryComponent implements OnInit {
  rows = [];
  columns = [];
  options: NgDateRangePickerOptions;
  @ViewChild('Tmpl2015') Tmpl2015: TemplateRef<any>;
  @ViewChild('Tmpl2016') Tmpl2016: TemplateRef<any>;
  @ViewChild('Tmpl2017') Tmpl2017: TemplateRef<any>;
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
  
  // this.expenseCategoryReportService.getExpenseCategories().subscribe(data => {
  //   this.rows = data.expenseReportGroups;
  // });

  var result = this.expenseCategoryReportService.getFiscalExpenseCategories().subscribe(data => {
    // this.columns = [
    //   {
    //     name: 'Expense Category'
    //   },
    //   ...data.years.map(year => {    
    //     return {
    //       name: year,
    //       cellTemplate: this.expenseAmtTmpl
    //     };
    //   })
    // ];

    this.columns = [
      {
        name: 'Expense Category'
      },
      {
        name: '2015',
        cellTemplate: this.Tmpl2015
      },
      {
        name: '2016',
        cellTemplate: this.Tmpl2016
      },
      {
        name: '2017',
        cellTemplate: this.Tmpl2017
      },
      
    ];

    this.rows = data.results;
    
    console.log(data);
  });

  }

}
