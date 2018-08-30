import { Component, OnInit } from "@angular/core";
import { ExpenseCategoryService } from "./expense-category.service";
import { TrackByService } from "../../../core/trackby.service";
import { ExpenseCategory } from "../../../shared/model/domain/expense-category.model";

@Component({
  selector: "expense-category",
  templateUrl: "./expense-category.component.html",
  styleUrls: ["./expense-category.component.scss"]
})
export class ExpenseCategoryComponent implements OnInit {
  expenseCategories: ExpenseCategory[] = [];
  constructor(
    private expenseCategoryService: ExpenseCategoryService,
    public trackby: TrackByService
  ) {}

  ngOnInit() {
    this.expenseCategoryService.getExpenseCategories().subscribe(data => {
      this.expenseCategories = data.expenseCategories;
    });
  }
}
