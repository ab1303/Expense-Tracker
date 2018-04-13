import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminComponent } from "./administration.component";
import { SharedModule } from "../../shared/shared.module";

// const ADMIN_ROUTE = [{ path: "", component: AdminComponent }];
import { AdminRoutes } from "./administration.routes";
import { UsersComponent } from "./users/users.component";
import { ExpenseCategoryComponent } from "./expense-category/expense-category.component";

@NgModule({
  declarations: [AdminComponent, UsersComponent, ExpenseCategoryComponent],
  imports: [CommonModule, SharedModule.forRoot(), AdminRoutes]
})
export class AdminModule {}
