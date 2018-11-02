import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { API_BASE_ADDRESS } from "../../../app.constants";
import { PaySlipApiResponse, IPaySlip } from "./pay-slip.model";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { tap } from "rxjs/operators";

import { GenericBaseApiResponse } from "../../../shared/model/api-responses/GenericBaseApiResponse";
import { Page } from "../../../shared/model/paging/page";
import { BaseApiResponse } from "../../../shared/model/api-responses/base-api-response";


const API_URL = `${API_BASE_ADDRESS}/PaySlip`;
@Injectable()
export class PaySlipService {
  paySlips: IPaySlip[];
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
      .pipe( 
        tap(response => this.paySlips = (response as PaySlipApiResponse).paySlips)
      )
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

  
  deletePaySlip(paySlipId: Number): Observable<BaseApiResponse> {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    // return this.http.delete(url,options)
     return this.http
      .delete<BaseApiResponse>(`${API_URL}/Delete/${paySlipId}`).catch(this.handleError);
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
