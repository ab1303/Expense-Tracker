import { BaseApiResponse } from "../../../shared/model/api-responses/base-api-response";

export interface IExpenseCategory {
  id: number;
  name: string;
  description: string;
  dateCreated: Date;
  dateChanged: Date;
}

export interface ExpenseCategoryApiResponse extends BaseApiResponse {
  expenseCategories: IExpenseCategory[];
}
