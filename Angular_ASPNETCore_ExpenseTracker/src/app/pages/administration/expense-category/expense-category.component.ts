import { Component, OnInit } from "@angular/core";
import { ExpenseCategoryService } from "./expense-category.service";
import { TrackByService } from "../../../core/trackby.service";
import { ExpenseCategory } from "./types/expense-category.model";
import { AddModalComponent } from "./components/add-modal/add-modal.component";
import { EditModalComponent } from "./components/edit-modal/edit-modal.component";
import { MatDialog } from "@angular/material";
import { ToastrService } from "ngx-toastr";

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
    public trackby: TrackByService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.expenseCategoryService.getExpenseCategories().subscribe(data => {
      this.expenseCategories = data.expenseCategories;
    });
  }


  openAddDialog() {
    const dialogRef = this.dialog.open(AddModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(!result.model) return;
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
            this.toastrService.success('Expense category added')
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
      if(!result.model) return;
      const { categoryName, categoryDescription } = result.model;
      this.expenseCategoryService.updateExpenseCategory(expenseCategory.id, categoryName, categoryDescription)
        .subscribe(
          response => {
            this.expenseCategories = [
              ...this.expenseCategories.map(e => {
                if(e.id !== expenseCategory.id) return e;
                return {
                  id: response.model,
                  name: categoryName,
                  description: categoryDescription,
                  dateCreated: null,
                  dateChanged: null,
                }; 
              })
            ];
            this.toastrService.success('Expense category updated');
          }
        )

    });
  }

  deleteExpenseCategory(id){
    this.expenseCategoryService.deleteExpenseCategory(id)
    .subscribe(
      response => {
        this.toastrService.success('Expense category deleted');
        this.expenseCategories = [
          ...this.expenseCategories.filter(e => e.id !== id),
        ];
        
      }
    )
  }



}
