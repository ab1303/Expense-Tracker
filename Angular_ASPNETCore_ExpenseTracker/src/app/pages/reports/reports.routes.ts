import { Routes, RouterModule } from "@angular/router";

import { ExpenseCategoryComponent } from "./expense-category/expense-category.component";

export const REPORTS_ROUTES = [
    {
        path: "expense-category",
        component: ExpenseCategoryComponent,
      },
];
