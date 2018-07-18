import { BaseApiResponse } from "../../../shared/model/api-responses/base-api-response";

export interface ITransaction {
  id: number;
  amount: number;
  category: string;
  name: string;
  details: string;
  paidBy: string;
  paidFor: string;
  paidForType: number;
  frequency: number;
  dateCreated: Date;
  dateChanged: Date;
}

export interface TransactionApiResponse extends BaseApiResponse {
  transactions: ITransaction[];
}
