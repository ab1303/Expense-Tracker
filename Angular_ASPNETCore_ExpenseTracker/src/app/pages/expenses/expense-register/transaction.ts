import { BaseApiResponse } from "../../../shared/model/api-responses/base-api-response";

export interface ITransaction {
  id: number;
  amount: number;
  categoryName: string;
  name: string;
  details: string;
  paidBy: string;
  paidFor: string;
  paidForType: number;
  frequency: number;
  transactionDate: Date;
  dateCreated: Date;
  dateChanged: Date;
}

export interface IndividualTransactionsApiResponse extends BaseApiResponse {
  individualTransactions: ITransaction[];
}
