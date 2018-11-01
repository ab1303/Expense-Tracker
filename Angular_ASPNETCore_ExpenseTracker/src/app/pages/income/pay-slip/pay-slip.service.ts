import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { API_BASE_ADDRESS } from "../../../app.constants";
import { PaySlipApiResponse, IPaySlip } from "./pay-slip.model";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { GenericBaseApiResponse } from "../../../shared/model/api-responses/GenericBaseApiResponse";
import { Page } from "../../../shared/model/paging/page";


const API_URL = `${API_BASE_ADDRESS}/PaySlip`;
@Injectable()
export class PaySlipService {
  constructor(private http: HttpClient) { }

  getPaySlips(page: Page): Observable<PaySlipApiResponse> {

    let parameters = new HttpParams({
      fromObject : {
        'PageIndex' : `${page.pageNumber}`,
        'PageSize' : `${page.size}`
      },
    });

    return this.http
      .get(API_URL, {
        params: parameters,
      })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  addPaySlip(frequency: Number, periodStart: Date, periodEnd: Date, totalEarnings: Number, netPay: Number, superAnnuation: Number): Observable<GenericBaseApiResponse<number>> {

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
