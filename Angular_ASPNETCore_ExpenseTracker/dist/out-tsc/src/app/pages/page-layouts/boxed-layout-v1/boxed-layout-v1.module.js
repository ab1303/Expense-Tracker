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
var boxed_layout_v1_component_1 = require("./boxed-layout-v1.component");
var shared_module_1 = require("../../../shared/shared.module");
var BoxedV1_ROUTE = [
    { path: '', component: boxed_layout_v1_component_1.BoxedV1Component },
];
var BoxedV1Module = /** @class */ (function () {
    function BoxedV1Module() {
    }
    BoxedV1Module = __decorate([
        core_1.NgModule({
            declarations: [boxed_layout_v1_component_1.BoxedV1Component],
            imports: [
                common_1.CommonModule,
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(BoxedV1_ROUTE)
            ]
        })
    ], BoxedV1Module);
    return BoxedV1Module;
}());
exports.BoxedV1Module = BoxedV1Module;
//# sourceMappingURL=boxed-layout-v1.module.js.map