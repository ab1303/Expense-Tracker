import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgDateRangePickerModule } from "ng-daterangepicker";

import { SharedModule } from "../../shared/shared.module";

import { REPORTS_ROUTES } from "./reports.routes";

import { ReportsComponent } from "./reports.component";
import { ExpenseCategoryComponent } from "./expense-category/expense-category.component";

import { ExpenseCategoryReportService } from "./expense-category/expense-category-report.service";
@NgModule({
  imports: [
    CommonModule,
    NgDateRangePickerModule,
    NgxDatatableModule, 
    SharedModule.forRoot(),
    RouterModule.forChild(REPORTS_ROUTES)
  ],
  declarations: [ReportsComponent, ExpenseCategoryComponent],
  providers: [ExpenseCategoryReportService]
})
export class ReportsModule {}
