import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

import { REPORTS_ROUTES } from "./reports.routes";

import { ReportsComponent } from './reports.component';
import { ExpenseCategoryComponent } from "./expense-category/expense-category.component";


@NgModule({
  imports: [CommonModule, RouterModule.forChild(REPORTS_ROUTES)],
  declarations: [ReportsComponent, ExpenseCategoryComponent]
})
export class ReportsModule { }
