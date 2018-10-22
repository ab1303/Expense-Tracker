import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_BASE_ADDRESS } from "../../../app.constants";
import { PaySlipApiResponse, IPaySlip } from "./pay-slip.model";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { GenericBaseApiResponse } from "../../../shared/model/api-responses/GenericBaseApiResponse";


const API_URL = `${API_BASE_ADDRESS}/PaySlip`;
@Injectable()
export class PaySlipService {
  constructor(private http: HttpClient) { }

  getExpenseCategories(): Observable<PaySlipApiResponse> {
    return this.http
      .get(API_URL)
      .map((response: Response) => {
        // let response = res.json();
        return response;
      })
      .catch(this.handleError);
  }


  addPaySlip(payslip: IPaySlip): Observable<GenericBaseApiResponse<number>> {

    const { frequency, periodStart, periodEnd, totalEarnings, netPay, superAnnuation } = payslip;

    return this.http
      .post<GenericBaseApiResponse<number>>(`${API_URL}/Add`, {
        frequency,
        periodStart,
        periodEnd,
        totalEarnings,
        netPay,
        superAnnuation,
      })
      .catch(this.handleError);

  }

  private handleError(error: any) {
    console.error("server error:", error);
    if (error instanceof Response) {
      let errMessage = "";
      try {
        // TODO: 
        // errMessage = error.json().error;
        errMessage = "what the fuck"
      } catch (err) {
        errMessage = error.statusText;
      }
      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      //return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || "ASP.NET Core server error");
  }
}
