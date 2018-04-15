import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import jwtdecode from "jwt-decode";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { tap } from "rxjs/operators/tap";
import { Subscriber } from "rxjs";


import { API_BASE_ADDRESS } from '../app.constants';
import { AppUserAuth } from "./app-user-auth";
import { AppUser } from "./app-user";


export const BEARER_TOKEN_KEY = "bearerToken";
const TOKEN_BUFFER_IN_MINUTES = 5;

const API_URL = `${API_BASE_ADDRESS}/auth`
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable()
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();

  constructor(private http: HttpClient) {}

  login(entity: AppUser): Observable<AppUserAuth> {
    // Initialize security object
    this.resetSecurityObject();

    return this.http
      .post<AppUserAuth>(`${API_URL}/login`, entity, httpOptions)
      .pipe(
        tap(resp => {
          // Use object assign to update the current object
          // NOTE: Don't create a new AppUserAuth object
          //       because that destroys all references to object
          Object.assign(this.securityObject, resp);
          // Store into local storage
          localStorage.setItem(
            BEARER_TOKEN_KEY,
            this.securityObject.bearerToken
          );
        })
      );
  }

  validateBearerToken() {
    const bearerToken = localStorage.getItem(BEARER_TOKEN_KEY);
    return bearerToken && !this.tokenNearOrHasExpired(bearerToken);
  }

  validateIdentity(): Observable<AppUserAuth> {
    var securityObjectObservable = new Observable<AppUserAuth>(observer => {
      observer.next(this.securityObject);
      observer.complete();
    });

    //return securityObjectObservable;

    if (!this.validateBearerToken()) {
      this.resetSecurityObject();
      return securityObjectObservable;
    }

    if (this.securityObject.bearerToken) return securityObjectObservable;

    return this.getIdentity()
      .take(1)
      .map(
        resp => {
          // Use object assign to update the current object
          // NOTE: Don't create a new AppUserAuth object
          //       because that destroys all references to object
          Object.assign(this.securityObject, resp);
          // Store into local storage
          localStorage.setItem(
            BEARER_TOKEN_KEY,
            this.securityObject.bearerToken
          );
          return this.securityObject;
        },
        error => {
          console.log("error fetching details of identity");
          return this.securityObject;
        }
      );
  }

 private getIdentity(): Observable<AppUserAuth> {
    // Decode bearer token and pass in username
    const decodedToken = jwtdecode(localStorage.getItem(BEARER_TOKEN_KEY));
    return this.http.get<AppUserAuth>(
      `${API_URL}/identity?userName=${decodedToken.sub}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }
    );
  }

  logout(): void {
    this.resetSecurityObject();
  }

  tokenNearOrHasExpired(token) {
    if (!token) return true;

    try {
      const decoded = jwtdecode(token);
      const now = Date.now() / 1000;

      // X minute buffer zone (X * 60 seconds)
      const nearExpiry = decoded.exp <= now - TOKEN_BUFFER_IN_MINUTES * 60;
      const expired = decoded.exp <= now;

      return nearExpiry || expired;
    } catch (e) {
      return true;
    }
  }

  resetSecurityObject(): void {
    console.log("security token reset");
    this.securityObject.userName = "";
    this.securityObject.bearerToken = "";
    this.securityObject.isAuthenticated = false;

    this.securityObject.claims = [];

    localStorage.removeItem("bearerToken");
  }

  // This method can be called a couple of different ways
  // *hasClaim="'claimType'"  // Assumes claimValue is true
  // *hasClaim="'claimType:value'"  // Compares claimValue to value
  // *hasClaim="['claimType1','claimType2:value','claimType3']"
  hasClaim(claimType: any, claimValue?: any) {
    let ret: boolean = false;

    // See if an array of values was passed in.
    if (typeof claimType === "string") {
      ret = this.isClaimValid(claimType, claimValue);
    } else {
      let claims: string[] = claimType;
      if (claims) {
        for (let index = 0; index < claims.length; index++) {
          ret = this.isClaimValid(claims[index]);
          // If one is successful, then let them in
          if (ret) {
            break;
          }
        }
      }
    }

    return ret;
  }

  private isClaimValid(claimType: string, claimValue?: string): boolean {
    let ret: boolean = false;
    let auth: AppUserAuth = null;

    // Retrieve security object
    auth = this.securityObject;
    if (auth) {
      // See if the claim type has a value
      // *hasClaim="'claimType:value'"
      if (claimType.indexOf(":") >= 0) {
        let words: string[] = claimType.split(":");
        claimType = words[0].toLowerCase();
        claimValue = words[1];
      } else {
        claimType = claimType.toLowerCase();
        // Either get the claim value, or assume 'true'
        claimValue = claimValue ? claimValue : "true";
      }
      // Attempt to find the claim
      ret =
        auth.claims.find(
          c =>
            c.claimType.toLowerCase() == claimType && c.claimValue == claimValue
        ) != null;
    }

    return ret;
  }
}
