import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminComponent } from "./administration.component";
import { SharedModule } from "../../shared/shared.module";

// const ADMIN_ROUTE = [{ path: "", component: AdminComponent }];
import { ADMIN_ROUTES } from "./administration.routes";
import { UsersComponent } from "./users/users.component";
import { ExpenseCategoryComponent } from "./expense-category/expense-category.component";
import { ExpenseCategoryService } from "./expense-category/expense-category.service";
import { TrackByService } from "../../core/trackby.service";

@NgModule({
  declarations: [AdminComponent, UsersComponent, ExpenseCategoryComponent],
  imports: [CommonModule, RouterModule.forChild(ADMIN_ROUTES)],
  providers: [ExpenseCategoryService, TrackByService]
})
export class AdminModule {}
