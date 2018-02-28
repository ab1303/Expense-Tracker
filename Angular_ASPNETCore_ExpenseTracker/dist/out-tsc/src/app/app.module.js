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
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var ng2_responsive_1 = require("ng2-responsive");
var app_component_1 = require("./app.component");
var app_service_1 = require("./app.service");
var app_state_1 = require("./app.state");
var services_module_1 = require("./shared/services/services.module");
var shared_module_1 = require("./shared/shared.module");
var app_routing_1 = require("./app.routing");
// Application wide providers
var APP_PROVIDERS = [app_service_1.AppState, app_state_1.GlobalState, platform_browser_1.Title];
var AppModule = /** @class */ (function () {
    function AppModule(appState) {
        this.appState = appState;
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                forms_1.ReactiveFormsModule,
                animations_1.BrowserAnimationsModule,
                services_module_1.ServicesModule,
                ng2_responsive_1.ResponsiveModule,
                shared_module_1.SharedModule.forRoot(),
                app_routing_1.AppRoutingModule
            ],
            providers: [APP_PROVIDERS],
            bootstrap: [app_component_1.AppComponent]
        }),
        __metadata("design:paramtypes", [app_service_1.AppState])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map