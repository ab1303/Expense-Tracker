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
var tabs_1 = require("ngx-bootstrap/tabs");
var left_side_nav_v1_component_1 = require("./left-side-nav-v1.component");
var shared_module_1 = require("../../../shared/shared.module");
var LeftSideNavV1_ROUTE = [
    { path: '', component: left_side_nav_v1_component_1.LeftSideNavV1Component },
];
var LeftSideNavV1Module = /** @class */ (function () {
    function LeftSideNavV1Module() {
    }
    LeftSideNavV1Module = __decorate([
        core_1.NgModule({
            declarations: [left_side_nav_v1_component_1.LeftSideNavV1Component],
            imports: [
                common_1.CommonModule,
                shared_module_1.SharedModule,
                tabs_1.TabsModule.forRoot(),
                router_1.RouterModule.forChild(LeftSideNavV1_ROUTE)
            ]
        })
    ], LeftSideNavV1Module);
    return LeftSideNavV1Module;
}());
exports.LeftSideNavV1Module = LeftSideNavV1Module;
//# sourceMappingURL=left-side-nav-v1.module.js.map