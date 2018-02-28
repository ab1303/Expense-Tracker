"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dashboards_component_1 = require("./dashboards.component");
var shared_module_1 = require("../../shared/shared.module");
var DASHBOARDS_ROUTE = [
    { path: '', component: dashboards_component_1.DashboardsComponent },
];
var DashboardsModule = /** @class */ (function () {
    function DashboardsModule() {
    }
    DashboardsModule = __decorate([
        core_1.NgModule({
            declarations: [dashboards_component_1.DashboardsComponent],
            imports: [
                common_1.CommonModule,
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(DASHBOARDS_ROUTE)
            ]
        })
    ], DashboardsModule);
    return DashboardsModule;
}());
exports.DashboardsModule = DashboardsModule;
//# sourceMappingURL=dashboards.module.js.map