import { BaseApiResponse } from "../../../shared/model/api-responses/base-api-response";

export interface IExpenseCategory {
  id: number;
  firstName: string;
  lastName: string;
  categoryName: string;
  groupName: string;
  transactionDate: Date;
  amount: number;
  
}

export interface ExpenseCategoryReportApiResponse extends BaseApiResponse {
  expenseCategories: IExpenseCategory[];
}
