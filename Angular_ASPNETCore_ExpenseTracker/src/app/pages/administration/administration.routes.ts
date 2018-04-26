import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "../../security/auth.guard";
import { ExpenseCategoryComponent } from "./expense-category/expense-category.component";
import { UsersComponent } from "./users/users.component";

export const ADMIN_ROUTES = [
    {
        path: "users",
        component: UsersComponent,
    },
    {
        path: "expense-category",
        component: ExpenseCategoryComponent,
      },
];
