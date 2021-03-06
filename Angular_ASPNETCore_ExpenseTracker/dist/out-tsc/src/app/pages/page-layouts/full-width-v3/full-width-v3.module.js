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
var full_width_v3_component_1 = require("./full-width-v3.component");
var shared_module_1 = require("../../../shared/shared.module");
var FullWidthV3_ROUTE = [
    { path: '', component: full_width_v3_component_1.FullWidthV3Component },
];
var FullWidthV3Module = /** @class */ (function () {
    function FullWidthV3Module() {
    }
    FullWidthV3Module = __decorate([
        core_1.NgModule({
            declarations: [full_width_v3_component_1.FullWidthV3Component],
            imports: [
                common_1.CommonModule,
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(FullWidthV3_ROUTE)
            ]
        })
    ], FullWidthV3Module);
    return FullWidthV3Module;
}());
exports.FullWidthV3Module = FullWidthV3Module;
//# sourceMappingURL=full-width-v3.module.js.map