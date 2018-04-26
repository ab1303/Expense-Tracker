import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "../../security/auth.guard";

import { ExpenseSheetComponent } from "./expense-sheet/expense-sheet.component";

export const EXPENSES_ROUTES = [
  {
    path: "sheets",
    component: ExpenseSheetComponent
  }
];
