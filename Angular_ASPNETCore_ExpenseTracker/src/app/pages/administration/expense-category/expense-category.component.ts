import { Component, OnInit } from "@angular/core";
import { ExpenseCategoryService } from "./expense-category.service";
import { TrackByService } from "../../../core/trackby.service";
import { ExpenseCategory } from "./types/expense-category.model";
import { AddModalComponent } from "./components/add-modal/add-modal.component";
import { EditModalComponent } from "./components/edit-modal/edit-modal.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: "expense-category",
  templateUrl: "./expense-category.component.html",
  styles: [`
    .card-container {
        display: flex;
        flex-wrap: wrap;
    }`]
})
export class ExpenseCategoryComponent implements OnInit {
  expenseCategories: ExpenseCategory[] = [];
  constructor(
    private expenseCategoryService: ExpenseCategoryService,
    public dialog: MatDialog,
    public trackby: TrackByService
  ) { }

  ngOnInit() {
    this.expenseCategoryService.getExpenseCategories().subscribe(data => {
      this.expenseCategories = data.expenseCategories;
    });
  }


  openAddDialog() {
    const dialogRef = this.dialog.open(AddModalComponent);

    dialogRef.afterClosed().subscribe(result => {

      const { categoryName, categoryDescription } = result.model;
      this.expenseCategoryService.addExpenseCategory(categoryName, categoryDescription)
        .subscribe(
          response => {
            this.expenseCategories = [
              ...this.expenseCategories,
              {
                id: response.model,
                name: categoryName,
                description: categoryDescription,
                dateCreated: null,
                dateChanged: null,
              }
            ];
          }
        )

    });
  }

  openEditDialog(expenseCategory) {
    const dialogRef = this.dialog.open(EditModalComponent, {
      data: {
        name: expenseCategory.name,
        description: expenseCategory.description,
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      const { categoryName, categoryDescription } = result.model;
      this.expenseCategoryService.addExpenseCategory(categoryName, categoryDescription)
        .subscribe(
          response => {
            this.expenseCategories = [
              ...this.expenseCategories,
              {
                id: response.model,
                name: categoryName,
                description: categoryDescription,
                dateCreated: null,
                dateChanged: null,
              }
            ];
          }
        )

    });
  }



}
