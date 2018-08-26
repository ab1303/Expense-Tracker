import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { API_BASE_ADDRESS } from "../../../app.constants";
import { ITransaction, IndividualTransactionsApiResponse } from "./transaction";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Page } from "../../../shared/model/paging/page";

const API_URL = `${API_BASE_ADDRESS}/Transactions`;
@Injectable()
export class ExpenseRegisterService {
  constructor(private http: HttpClient) { }

  getTransactions(page: Page): Observable<IndividualTransactionsApiResponse> {

    let parameters =
      new HttpParams()
        .append('PageIndex', `${page.pageNumber}`)
        .append('PageSize', `${page.size}`);

    // let parameters = new HttpParams({
    //   fromObject : {
    //     'PageIndex' : `${page.pageNumber}`,
    //     'PageIndex' : `${page.size}`
    //   },
    // });

    return this.http
      .get(API_URL, {
        params: parameters,
      })
      .map((response: Response) => {
        // let response = res.json();
        return response;
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
