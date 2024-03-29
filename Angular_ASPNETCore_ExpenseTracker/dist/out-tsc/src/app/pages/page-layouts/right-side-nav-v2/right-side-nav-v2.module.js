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
var right_side_nav_v2_component_1 = require("./right-side-nav-v2.component");
var shared_module_1 = require("../../../shared/shared.module");
var RightSideNavV2_ROUTE = [
    { path: '', component: right_side_nav_v2_component_1.RightSideNavV2Component },
];
var RightSideNavV2Module = /** @class */ (function () {
    function RightSideNavV2Module() {
    }
    RightSideNavV2Module = __decorate([
        core_1.NgModule({
            declarations: [right_side_nav_v2_component_1.RightSideNavV2Component],
            imports: [
                common_1.CommonModule,
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(RightSideNavV2_ROUTE)
            ]
        })
    ], RightSideNavV2Module);
    return RightSideNavV2Module;
}());
exports.RightSideNavV2Module = RightSideNavV2Module;
//# sourceMappingURL=right-side-nav-v2.module.js.map