import { Routes, RouterModule } from "@angular/router";

import { ExpenseCategoryComponent } from "./expense-category/expense-category.component";
import { MonthlyExpensesComponent } from "./monthly-expenses/monthly-expenses.component";

export const REPORTS_ROUTES = [
    {
        path: "expense-category",
        component: ExpenseCategoryComponent,
    },
    {
        path: "monthly-expenses",
        component: MonthlyExpensesComponent,
    },
];
