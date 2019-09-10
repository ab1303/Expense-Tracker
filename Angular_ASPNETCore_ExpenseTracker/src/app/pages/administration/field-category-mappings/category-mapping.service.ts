import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { API_BASE_ADDRESS } from "../../../app.constants";
import { CategoryMappingApiResponse } from "./category-mapping.response";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { GenericBaseApiResponse } from '../../../shared/model/api-responses/GenericBaseApiResponse';
import { BaseApiResponse } from '../../../shared/model/api-responses/base-api-response';

const API_URL = `${API_BASE_ADDRESS}/CategoryMapping`;
@Injectable()
export class CategoryMappingService {
    constructor(private http: HttpClient) {}

    getCategoryMappings(fieldCategory: number): Observable<CategoryMappingApiResponse> {
        return this.http
            .get(API_URL, {
                params: new HttpParams().append("fieldCategory", `${fieldCategory}`)
            })
            .map((response: CategoryMappingApiResponse) => response)
            .catch(this.handleError);
    }

    
  addCategoryMapping(fieldCategory: number, source: string, target: string): Observable<GenericBaseApiResponse<number>> {
    return this.http
      .post<GenericBaseApiResponse<number>>(`${API_URL}/Add`, {
        fieldCategory,
        source,
        target,
      })
      .catch(this.handleError);
  }

   
  deleteCategoryMapping(id: number): Observable<BaseApiResponse> {
    return this.http.delete<BaseApiResponse>(`${API_URL}/Delete/${id}`).catch(this.handleError);
  }



    private handleError(error: any) {
        console.error("server error:", error);
        if (error instanceof Response) {
            let errMessage = "";
            try {
                // TODO:
                // errMessage = error.json().error;
                errMessage = "Some error has happened";
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
