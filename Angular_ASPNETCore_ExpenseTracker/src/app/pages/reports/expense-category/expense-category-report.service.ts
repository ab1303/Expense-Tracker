import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_BASE_ADDRESS } from "../../../app.constants";
import { IExpenseCategory, ExpenseCategoryReportApiResponse } from "./expense-category";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

const API_URL = `${API_BASE_ADDRESS}/Reports`;
@Injectable()
export class ExpenseCategoryReportService {
  constructor(private http: HttpClient) {}

  getExpenseCategories(): Observable<ExpenseCategoryReportApiResponse> {
    return this.http
      .get(API_URL)
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
