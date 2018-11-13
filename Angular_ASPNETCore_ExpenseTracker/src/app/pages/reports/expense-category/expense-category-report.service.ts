
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_BASE_ADDRESS } from "../../../app.constants";
import { ExpenseCategoryReportApiResponse } from "./expense-category-report.model";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

const API_URL = `${API_BASE_ADDRESS}/Reports/ExpenseCategory`;
@Injectable()
export class ExpenseCategoryReportService {
  constructor(private http: HttpClient) { }

  getExpenseCategories(): Observable<ExpenseCategoryReportApiResponse> {
    return this.http
      .get(API_URL)
      .map((response: Response) => <ExpenseCategoryReportApiResponse>response)
      .catch(this.handleError);
  }

  getFiscalExpenseCategories(): Observable<any> {
    let transformedResponse: any[] = [];
    let years: any[] = [];
    return this.getExpenseCategories()
      .map(data => {
        const reportGroups = data.expenseReportGroups;
        reportGroups.map(yearGroup => {
          const year = yearGroup.category.groupingName;
          years.push(year);

          yearGroup.subCategories.map(expenseGroup => {
            let mappedResult: any = {};
            // find if expenseCategory is already been added
            const groupingTotal = !!expenseGroup.category.groupingTotal ? expenseGroup.category.groupingTotal : 0;
            if (transformedResponse.find(r => r.expenseCategory === expenseGroup.category.groupingName)) {
              mappedResult = transformedResponse.find(r => r.expenseCategory === expenseGroup.category.groupingName);
              mappedResult[`${year}`] = groupingTotal;
              mappedResult[`total`] += groupingTotal;
            } else {
              mappedResult[`expenseCategory`] = expenseGroup.category.groupingName;
              mappedResult[`${year}`] = groupingTotal;
              mappedResult[`total`] = groupingTotal;
              transformedResponse.push(mappedResult);
            }
          });
        });
        return {
          years,
          results: transformedResponse,
        };
      })
      ;
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
      return observableThrowError(errMessage);
      // Use the following instead if using lite-server
      //return Observable.throw(err.text() || 'backend server error');
    }
    return observableThrowError(error || "ASP.NET Core server error");
  }
}
