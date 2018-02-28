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
var detached_toolbar_right_component_1 = require("./detached-toolbar-right.component");
var shared_module_1 = require("../../../shared/shared.module");
var DETACHED_TOOLBAR_RIGHT_ROUTE = [
    { path: '', component: detached_toolbar_right_component_1.DetachedToolbarRightComponent },
];
var DetachedToolbarRightModule = /** @class */ (function () {
    function DetachedToolbarRightModule() {
    }
    DetachedToolbarRightModule = __decorate([
        core_1.NgModule({
            declarations: [detached_toolbar_right_component_1.DetachedToolbarRightComponent],
            imports: [
                common_1.CommonModule,
                shared_module_1.SharedModule,
                tabs_1.TabsModule.forRoot(),
                router_1.RouterModule.forChild(DETACHED_TOOLBAR_RIGHT_ROUTE)
            ]
        })
    ], DetachedToolbarRightModule);
    return DetachedToolbarRightModule;
}());
exports.DetachedToolbarRightModule = DetachedToolbarRightModule;
//# sourceMappingURL=detached-toolbar-right.module.js.map