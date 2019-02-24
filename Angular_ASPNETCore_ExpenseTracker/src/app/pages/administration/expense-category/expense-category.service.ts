import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { API_BASE_ADDRESS } from "../../../app.constants";
import { ExpenseCategoryApiResponse } from "./expense-category";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { GenericBaseApiResponse } from "../../../shared/model/api-responses/GenericBaseApiResponse";
import { BaseApiResponse } from "../../../shared/model/api-responses/base-api-response";


const API_URL = `${API_BASE_ADDRESS}/ExpenseCategory`;
@Injectable()
export class ExpenseCategoryService {
  constructor(private http: HttpClient) { }

  getExpenseCategories(): Observable<ExpenseCategoryApiResponse> {
    return this.http
      .get(API_URL)
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  addExpenseCategory(categoryName: string, categoryDescription: string): Observable<GenericBaseApiResponse<number>> {
    return this.http
      .post<GenericBaseApiResponse<number>>(`${API_URL}/Add`, {
        categoryName,
        categoryDescription,
      })
      .catch(this.handleError);

  }

  
  updateExpenseCategory(id: number, categoryName: string, categoryDescription: string): Observable<GenericBaseApiResponse<number>> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .put<GenericBaseApiResponse<number>>(`${API_URL}/Update/${id}`, {
        categoryName,
        categoryDescription,
      }, { headers: headers })
      .catch(this.handleError);

  }

  
  deleteExpenseCategory(id: number): Observable<BaseApiResponse> {
    return this.http.delete<BaseApiResponse>(`${API_URL}/Delete/${id}`).catch(this.handleError);
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
