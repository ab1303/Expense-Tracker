import { BaseApiResponse } from "../../../shared/model/api-responses/base-api-response";

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
}
