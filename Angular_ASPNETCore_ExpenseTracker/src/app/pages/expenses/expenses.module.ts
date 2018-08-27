import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { FileUploadModule } from 'ng2-file-upload';

import { TrackByService } from "../../core/trackby.service";
import { SharedModule } from "../../shared/shared.module";

import { ExpensesComponent } from "./expenses.component";
import { EXPENSES_ROUTES } from "./expenses.routes";
import { ExpenseSheetComponent } from "./expense-sheet/expense-sheet.component";
import { ExpenseSheetService } from './expense-sheet/expense-sheet.service';
import { ExpenseRegisterService } from './expense-register/expense-register.service';
import { ExpenseRegisterComponent } from './expense-register/expense-register.component';
import { DataTablesComponent } from "./data-tables/data-tables.component";

@NgModule({
  declarations: [ExpensesComponent, ExpenseSheetComponent, ExpenseRegisterComponent, DataTablesComponent],
  imports: [
    CommonModule, 
    FileUploadModule, 
    NgxDatatableModule, 
    SharedModule.forRoot(), RouterModule.forChild(EXPENSES_ROUTES)],
  providers: [TrackByService, ExpenseSheetService, ExpenseRegisterService]
})
export class ExpensesModule {}
