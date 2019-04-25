import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

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
import { RequestOptions } from "@angular/http";

const API_URL = `${API_BASE_ADDRESS}/PaySlip`;
@Injectable()
export class PaySlipService {
    paySlips: IPaySlip[];
    constructor(private http: HttpClient) {}

    getPaySlips(page: Page): Observable<PaySlipApiResponse> {
        let parameters = new HttpParams({
            fromObject: {
                PageIndex: `${page.pageNumber}`,
                PageSize: `${page.size}`
            }
        });

        return this.http
            .get(API_URL, {
                params: parameters
            })
            .pipe(tap(response => (this.paySlips = (response as PaySlipApiResponse).paySlips)))
            .map((response: PaySlipApiResponse) => {
                // let response = res.json();
                return response;
            })
            .catch(this.handleError);
    }

    addPaySlip(paySlip: IPaySlip): Observable<GenericBaseApiResponse<number>> {
        return this.http.post<GenericBaseApiResponse<number>>(`${API_URL}/Add`, paySlip).catch(this.handleError);
    }

    updatePaySlip(paySlip: IPaySlip): Observable<GenericBaseApiResponse<number>> {
        let headers = new HttpHeaders({ "Content-Type": "application/json" });

        return this.http
        .put(`${API_URL}/Update`, paySlip, { headers: headers })
        .map((response: GenericBaseApiResponse<number>) => response)
        .catch(this.handleError);
    }

    deletePaySlip(paySlipId: Number): Observable<BaseApiResponse> {
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        // return this.http.delete(url,options)
        return this.http.delete<BaseApiResponse>(`${API_URL}/Delete/${paySlipId}`).catch(this.handleError);
    }

    private handleError(error: any) {
        console.error("server error:", error);
        if (error instanceof Response) {
            let errMessage = "";
            try {
                // TODO:
                // errMessage = error.json().error;
                errMessage = "what the fuck";
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
