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
  @ViewChild('hdrTpl') HeaderTemplate: TemplateRef<any>;
  @ViewChild('expenseAmtTpl') ExpenseAmtTmpl: TemplateRef<any>;
  @ViewChild('summaryTpl') SummaryTpl: TemplateRef<any>;
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

    var result = this.expenseCategoryReportService.getFiscalExpenseCategories().subscribe(data => {
      this.columns = [
        {
          name: 'Expense Category',
          headerTemplate: this.HeaderTemplate,
          summaryFunc: () => null
        },
        ...data.years.map(year => {
          return {
            name: year,
            prop: year,
            cellTemplate: this.ExpenseAmtTmpl,
            headerTemplate: this.HeaderTemplate,
            summaryTemplate: this.SummaryTpl
          };
        }),
        {
          name: 'Total',
          prop: 'total',
          cellTemplate: this.ExpenseAmtTmpl,
          headerTemplate: this.HeaderTemplate,
          summaryTemplate: this.SummaryTpl
        },
      ];

      console.log(data.results);
      this.rows = data.results;
    });

  }

  private yearlyTotal(columnName: string): number {
    const total = this.rows.map(r => r[columnName]).reduce((sum, cell) => sum += !!cell ? cell : 0);
    console.log(total);
    return total;
  }

}
