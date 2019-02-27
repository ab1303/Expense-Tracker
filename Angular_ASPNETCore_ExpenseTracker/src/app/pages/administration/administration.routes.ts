import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "../../security/auth.guard";
import { ExpenseCategoryComponent } from "./expense-category/expense-category.component";
import { UsersComponent } from "./users/users.component";
import { FieldCategoryMappingComponent } from "./field-category-mappings/field-category-mapping.component";

export const ADMIN_ROUTES = [
    {
        path: "users",
        component: UsersComponent,
    },
    {
        path: "expense-category",
        component: ExpenseCategoryComponent,
    },
    {
        path: "field-category-mapping",
        component: FieldCategoryMappingComponent,
    },
];
