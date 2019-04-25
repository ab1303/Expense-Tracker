import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { API_BASE_ADDRESS } from "../../../app.constants";
import { IndividualTransactionsApiResponse, SearchLookups } from "./transaction";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Page } from "../../../shared/model/paging/page";
import { FilterService } from "./filter.service";
import { BaseApiResponse } from "../../../shared/model/api-responses/base-api-response";

const API_URL = `${API_BASE_ADDRESS}/Transactions`;
@Injectable()
export class ExpenseRegisterService {
  constructor(private http: HttpClient) { }

  getTransactions(page: Page, searchModel: FilterService): Observable<IndividualTransactionsApiResponse> {

    let parameters =
      new HttpParams()
        .append('PageIndex', `${page.pageNumber}`)
        .append('PageSize', `${page.size}`)
        .append('expenseCategoryId', `${searchModel.expenseCategoryId}`)
      ;

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
      .map((response: IndividualTransactionsApiResponse) => {
        // let response = res.json();
        return response;
      })
      .catch(this.handleError);
  }


  getSearchLookups(): Observable<SearchLookups> {
    return this.http
      .get(`${API_URL}/SearchLookups`)
      .map((response: SearchLookups) => {
        // let response = res.json();
        return response;
      })
      .catch(this.handleError);
  }

  updateTransactions(transactionIds: number[], expenseCategoryId: number): Observable<BaseApiResponse> {
    return this.http
      .post<BaseApiResponse>(`${API_URL}/BulkUpdate`, {
        transactionIds,
        expenseCategoryId,
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
