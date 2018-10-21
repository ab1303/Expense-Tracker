import { BaseApiResponse } from "../../../shared/model/api-responses/base-api-response";

export interface PaySlip {
    id: number;
    startDate: Date;
    endDate: Date;
    frequency: Number;
    totalEarnings: Number;
    netEarnings: Number;
    superAnnuation: Number;
  }
  

export interface PaySlipApiResponse extends BaseApiResponse {
  paySlips: PaySlip[];
}
