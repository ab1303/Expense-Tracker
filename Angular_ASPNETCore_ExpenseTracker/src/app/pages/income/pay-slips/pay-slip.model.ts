import { BaseApiResponse } from "../../../shared/model/api-responses/base-api-response";
import { Page } from "../../../shared/model/paging/page";

export interface IPaySlip {
    id: Number;
    frequency: Number;
    periodStart: Date,
    periodEnd: Date,
    totalEarnings: Number;
    netPay: Number;
    superAnnuation: Number;
  }
  

export interface PaySlipApiResponse extends BaseApiResponse {
  paySlips: IPaySlip[];
  page: Page,
}
