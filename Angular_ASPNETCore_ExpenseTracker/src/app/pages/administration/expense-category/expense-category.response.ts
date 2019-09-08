import { BaseApiResponse } from "../../../shared/model/api-responses/base-api-response";
import { ExpenseCategory } from "./types/expense-category.model";

export interface ExpenseCategoryApiResponse extends BaseApiResponse {
  expenseCategories: ExpenseCategory[];
}
