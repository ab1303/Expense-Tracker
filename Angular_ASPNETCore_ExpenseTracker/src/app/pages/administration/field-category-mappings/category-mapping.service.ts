import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { API_BASE_ADDRESS } from "../../../app.constants";
import { CategoryMappingApiResponse } from "./category-mapping.response";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

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
