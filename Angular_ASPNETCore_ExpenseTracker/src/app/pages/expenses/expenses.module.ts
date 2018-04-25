import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { TrackByService } from "../../core/trackby.service";
import { SharedModule } from "../../shared/shared.module";

import { ExpensesComponent } from "./expenses.component";
import { ExpensesRoutes } from "./expenses.routes";
import { ExpenseSheetComponent } from "./expense-sheet/expense-sheet.component";

@NgModule({
  declarations: [ExpensesComponent, ExpenseSheetComponent],
  imports: [CommonModule, SharedModule.forRoot(), ExpensesRoutes],
  providers: [TrackByService]
})
export class ExpensesModule {}
