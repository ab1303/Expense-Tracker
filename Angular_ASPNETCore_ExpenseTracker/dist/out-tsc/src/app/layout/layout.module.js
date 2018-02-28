"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var layout_routes_1 = require("./layout.routes");
var forms_1 = require("@angular/forms");
var layout_component_1 = require("./layout.component");
var left_sidebar_component_1 = require("./left-sidebar/left-sidebar.component");
var top_navbar_component_1 = require("./top-navbar/top-navbar.component");
var search_component_1 = require("./top-navbar/search/search.component");
var right_sidebar_component_1 = require("./right-sidebar/right-sidebar.component");
var shared_module_1 = require("../shared/shared.module");
var scrollbar_directive_1 = require("../shared/directives/scrollbar.directive");
var nav_dropdown_directive_1 = require("../shared/directives/nav-dropdown.directive");
var ngx_perfect_scrollbar_1 = require("ngx-perfect-scrollbar");
var PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule = __decorate([
        core_1.NgModule({
            declarations: [
                layout_component_1.LayoutComponent,
                left_sidebar_component_1.LeftSidebarComponent,
                top_navbar_component_1.TopNavbarComponent,
                search_component_1.SearchComponent,
                right_sidebar_component_1.RightSidebarComponent,
                scrollbar_directive_1.ScrollbarDirective,
                nav_dropdown_directive_1.NavDropDownDirectives
            ],
            imports: [
                layout_routes_1.LayoutRoutes,
                common_1.CommonModule,
                forms_1.FormsModule,
                shared_module_1.SharedModule.forRoot(),
                ngx_perfect_scrollbar_1.PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
            ]
        })
    ], LayoutModule);
    return LayoutModule;
}());
exports.LayoutModule = LayoutModule;
//# sourceMappingURL=layout.module.js.map