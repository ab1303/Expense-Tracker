"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Angular
// https://angular.io/
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
// Angular Material
// https://material.angular.io/
var material_1 = require("@angular/material");
var ngu_utility_module_1 = require("ngu-utility/ngu-utility.module");
var ngx_malihu_scrollbar_1 = require("ngx-malihu-scrollbar");
// ngx-bootstrap4
// http://valor-software.com/ngx-bootstrap/index-bs4.html#/
var tabs_1 = require("ngx-bootstrap/tabs");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var alert_1 = require("ngx-bootstrap/alert");
var modal_1 = require("ngx-bootstrap/modal");
var popover_1 = require("ngx-bootstrap/popover");
// UI Shared Components
var footer_component_1 = require("../layout/footer/footer.component");
var app_backdrop_component_1 = require("./components/app_backdrop/app_backdrop.component");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule_1 = SharedModule;
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1
        };
    };
    SharedModule = SharedModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                material_1.MdButtonModule,
                material_1.MdButtonToggleModule,
                material_1.MdCardModule,
                material_1.MdCheckboxModule,
                material_1.MdIconModule,
                material_1.MdRadioModule,
                material_1.MdRippleModule,
                material_1.MdSidenavModule,
                material_1.StyleModule,
                ngu_utility_module_1.NguUtilityModule,
                dropdown_1.BsDropdownModule.forRoot(),
                alert_1.AlertModule.forRoot(),
                tabs_1.TabsModule.forRoot(),
                ngx_malihu_scrollbar_1.MalihuScrollbarModule.forRoot(),
                modal_1.ModalModule.forRoot(),
                popover_1.PopoverModule.forRoot()
            ],
            declarations: [
                app_backdrop_component_1.AppBackdropComponent,
                footer_component_1.FooterComponent
            ],
            exports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                material_1.MdButtonModule,
                material_1.MdButtonToggleModule,
                material_1.MdCardModule,
                material_1.MdCheckboxModule,
                material_1.MdIconModule,
                material_1.MdRadioModule,
                material_1.MdRippleModule,
                material_1.MdSidenavModule,
                material_1.StyleModule,
                ngu_utility_module_1.NguUtilityModule,
                app_backdrop_component_1.AppBackdropComponent,
                forms_1.ReactiveFormsModule,
                tabs_1.TabsModule,
                dropdown_1.BsDropdownModule,
                alert_1.AlertModule,
                ngx_malihu_scrollbar_1.MalihuScrollbarModule,
                modal_1.ModalModule,
                popover_1.PopoverModule
            ]
        })
    ], SharedModule);
    return SharedModule;
    var SharedModule_1;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map