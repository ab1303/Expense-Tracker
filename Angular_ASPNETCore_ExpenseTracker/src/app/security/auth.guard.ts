import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { SecurityService, BEARER_TOKEN_KEY } from "./security.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // if (!this.securityService.validateIdentity()) {
    //   this.router.navigate(["authentication/login"], {
    //     queryParams: { returnUrl: state.url }
    //   });
    //   return false;
    // }
    return this.securityService.validateIdentity().map(securityObject => {
      if (!securityObject.isAuthenticated) {
        this.router.navigate(["authentication/login"], {
          queryParams: { returnUrl: state.url }
        });
        return false;
      }
      // Get property name on security object to check
      let claimType: string = next.data["claimType"];

      if (this.securityService.hasClaim(claimType)) {
        return true;
      } else {
        this.router.navigate(["authentication/login"], {
          queryParams: { returnUrl: state.url }
        });
        return false;
      }
    });
  }
}
