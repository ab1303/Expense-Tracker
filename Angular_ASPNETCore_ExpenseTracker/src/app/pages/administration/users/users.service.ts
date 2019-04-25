import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_BASE_ADDRESS } from "../../../app.constants";
import { usersApiResponse } from "./user.model"
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

const API_URL = `${API_BASE_ADDRESS}/Users`;
@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<usersApiResponse> {
    return this.http
      .get(API_URL)
      .map((response: usersApiResponse) => {
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
