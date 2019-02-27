import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { AdminComponent } from "./administration.component";
import { SharedModule } from "../../shared/shared.module";

// const ADMIN_ROUTE = [{ path: "", component: AdminComponent }];
import { TrackByService } from "../../core/trackby.service";
import { ADMIN_ROUTES } from "./administration.routes";
import { UsersComponent } from "./users/users.component";
import { UsersService } from "./users/users.service";
import { ExpenseCategoryComponent } from "./expense-category/expense-category.component";
import { ExpenseCategoryService } from "./expense-category/expense-category.service";
import { AddModalComponent as ExpenseCategoryAddModal } from "./expense-category/components/add-modal/add-modal.component";
import { EditModalComponent as ExpenseCategoryEditModal } from "./expense-category/components/edit-modal/edit-modal.component";
import { FieldCategoryMappingComponent } from "./field-category-mappings/field-category-mapping.component";

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    ExpenseCategoryComponent,
    ExpenseCategoryAddModal,
    ExpenseCategoryEditModal,
    FieldCategoryMappingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    SharedModule,
    RouterModule.forChild(ADMIN_ROUTES)
  ],
  providers: [ExpenseCategoryService, UsersService, TrackByService],
  entryComponents: [ExpenseCategoryAddModal, ExpenseCategoryEditModal],
})
export class AdminModule { }
