"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var tap_1 = require("rxjs/operators/tap");
var app_user_auth_1 = require("./app-user-auth");
var API_URL = "http://localhost:5000/api/security/";
var httpOptions = {
    headers: new http_1.HttpHeaders({
        'Content-Type': 'application/json'
    })
};
var SecurityService = /** @class */ (function () {
    function SecurityService(http) {
        this.http = http;
        this.securityObject = new app_user_auth_1.AppUserAuth();
    }
    SecurityService.prototype.login = function (entity) {
        var _this = this;
        // Initialize security object
        this.resetSecurityObject();
        return this.http.post(API_URL + "login", entity, httpOptions).pipe(tap_1.tap(function (resp) {
            // Use object assign to update the current object
            // NOTE: Don't create a new AppUserAuth object
            //       because that destroys all references to object
            Object.assign(_this.securityObject, resp);
            // Store into local storage
            localStorage.setItem("bearerToken", _this.securityObject.bearerToken);
        }));
    };
    SecurityService.prototype.logout = function () {
        this.resetSecurityObject();
    };
    SecurityService.prototype.resetSecurityObject = function () {
        this.securityObject.userName = "";
        this.securityObject.bearerToken = "";
        this.securityObject.isAuthenticated = false;
        this.securityObject.claims = [];
        localStorage.removeItem("bearerToken");
    };
    // This method can be called a couple of different ways
    // *hasClaim="'claimType'"  // Assumes claimValue is true
    // *hasClaim="'claimType:value'"  // Compares claimValue to value
    // *hasClaim="['claimType1','claimType2:value','claimType3']"
    SecurityService.prototype.hasClaim = function (claimType, claimValue) {
        var ret = false;
        // See if an array of values was passed in.
        if (typeof claimType === "string") {
            ret = this.isClaimValid(claimType, claimValue);
        }
        else {
            var claims = claimType;
            if (claims) {
                for (var index = 0; index < claims.length; index++) {
                    ret = this.isClaimValid(claims[index]);
                    // If one is successful, then let them in
                    if (ret) {
                        break;
                    }
                }
            }
        }
        return ret;
    };
    SecurityService.prototype.isClaimValid = function (claimType, claimValue) {
        var ret = false;
        var auth = null;
        // Retrieve security object
        auth = this.securityObject;
        if (auth) {
            // See if the claim type has a value
            // *hasClaim="'claimType:value'"
            if (claimType.indexOf(":") >= 0) {
                var words = claimType.split(":");
                claimType = words[0].toLowerCase();
                claimValue = words[1];
            }
            else {
                claimType = claimType.toLowerCase();
                // Either get the claim value, or assume 'true'
                claimValue = claimValue ? claimValue : "true";
            }
            // Attempt to find the claim
            ret = auth.claims.find(function (c) {
                return c.claimType.toLowerCase() == claimType &&
                    c.claimValue == claimValue;
            }) != null;
        }
        return ret;
    };
    SecurityService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SecurityService);
    return SecurityService;
}());
exports.SecurityService = SecurityService;
//# sourceMappingURL=security.service.js.map