import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { TrackByService } from "../../core/trackby.service";
import { SharedModule } from "../../shared/shared.module";

import { ExpensesComponent } from "./expenses.component";
import { ExpensesRoutes } from "./expenses.routes";
import { ExpenseSheetComponent } from "./expense-sheet/expense-sheet.component";
import { ExpenseSheetService } from './expense-sheet/expense-sheet.service';

@NgModule({
  declarations: [ExpensesComponent, ExpenseSheetComponent],
  imports: [
    CommonModule, 
    NgxDatatableModule, 
    SharedModule.forRoot(), ExpensesRoutes],
  providers: [TrackByService, ExpenseSheetService]
})
export class ExpensesModule {}
