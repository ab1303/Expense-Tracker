import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { TrackByService } from "../../core/trackby.service";
import { SharedModule } from "../../shared/shared.module";


import { EXPENSES_ROUTES } from "./expenses.routes";

import { ExpensesComponent } from "./expenses.component";
import { ExpenseSheetComponent } from "./expense-sheet/expense-sheet.component";
import { ExpenseSheetService } from './expense-sheet/expense-sheet.service';
import { ExpenseRegisterService } from './expense-register/expense-register.service';
import { ExpenseRegisterComponent } from './expense-register/expense-register.component';
import { DataTablesComponent } from "./data-tables/data-tables.component";
import { BulkEditModalComponent } from './expense-register/components/bulk-edit-modal/bulk-edit-modal.component';

@NgModule({
  declarations: [
    ExpensesComponent,
    ExpenseSheetComponent,
    ExpenseRegisterComponent,
    DataTablesComponent,
    BulkEditModalComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    SharedModule.forRoot(), RouterModule.forChild(EXPENSES_ROUTES)],
  entryComponents: [BulkEditModalComponent],
  providers: [TrackByService, ExpenseSheetService, ExpenseRegisterService]
})
export class ExpensesModule { }
