webpackJsonp(["dashboards.module"],{

/***/ "./src/app/pages/dashboards/dashboards.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"content_wrapper\" class=\"fullWidth2-wrapper rightSidenav2-wrapper\">\n\t<!--// Sidenav component container-->\n\t<md-sidenav-container class=\"sidenav-container\">\n\t\t<div class=\"content\">\n\t\t\t<header class=\"header-wrapper header-sm shadow-none\">\n\t\t\t\t<h1>{{title}}</h1>\n\t\t\t\t<ul class=\"actions icons top-right\">\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<a href=\"javascript:void(0)\" (click)=\"rightSidenav2.toggle()\">\n\t\t\t\t\t\t\t<i class=\"zmdi zmdi-menu\"></i>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</header>\n\t\t\t<tabset class=\"tabpanel tab-header\">\n\t\t\t\t<tab heading=\"Tab 1\">\n\t\t\t\t\t<div class=\"content-body\">\n\t\t\t\t\t\t<div class=\"card\">\n\t\t\t\t\t\t\t<header class=\"card-header\">\n\t\t\t\t\t\t\t\t<h2 class=\"card-title\">Welcome</h2>\n\t\t\t\t\t\t\t</header>\n\t\t\t\t\t\t\t<div class=\"card-block\">\n\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\tThis is the Angular 4 + Bootstrap 4 Seed Project.\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</tab>\n\t\t\t\t<tab heading=\"Tab 2\">\n\t\t\t\t\t<div class=\"content-body\">\n\t\t\t\t\t\t<div class=\"card\">\n\t\t\t\t\t\t\t<header class=\"card-header\">\n\t\t\t\t\t\t\t\t<h2 class=\"card-title\">Card Title</h2>\n\t\t\t\t\t\t\t</header>\n\t\t\t\t\t\t\t<div class=\"card-block\">\n\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\tPaleo flexitarian bushwick letterpress, ea migas yr adipisicing. Man bun tacos tumblr kombucha, yuccie banjo affogato dolore gentrify retro chartreuse. Anim austin tempor ethical, sapiente food truck fanny pack farm-to-table. Culpa keytar esse tilde hoodie, art party nostrud messenger bag authentic helvetica kinfolk cred eu affogato forage.\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</tab>\n\t\t\t</tabset>\n\t\t</div>\n\t\t<!-- Sidenav -->\n\t\t<md-sidenav #rightSidenav2 mode=\"{{navMode}}\" align=\"end\" class=\"sidenav\">\n\t\t\t<aside id=\"rightSidenav2\" class=\"p-20\">\n\n\t\t\t</aside>\n\t\t</md-sidenav>\n\t\t<!-- /END Sidenav -->\n\t\t<!--  Footer Wrapper -->\n\t\t<footer id=\"footer_wrapper\" class=\"footer_wrapper\"></footer>\n\t</md-sidenav-container>\n\t<!-- /END Sidenav component container -->\n</div>\n<!-- /END Content Wrapper - right Sidenav 2-->\n"

/***/ }),

/***/ "./src/app/pages/dashboards/dashboards.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/pages/dashboards/dashboards.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_state__ = __webpack_require__("./src/app/app.state.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_config_config_service__ = __webpack_require__("./src/app/shared/services/config/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardsComponent = /** @class */ (function () {
    function DashboardsComponent(config, _elementRef, _state) {
        this.config = config;
        this._elementRef = _elementRef;
        this._state = _state;
        //Header Title
        this.title = "Dashboards";
        this.navMode = "side";
        //Task List
        this.tasks = [
            { taskId: 1, title: "add gulp script to project" },
            { taskId: 2, title: "update style guide" },
            { taskId: 3, title: "send over prototype to client" },
            { taskId: 4, title: "complete Landing page" },
            { taskId: 5, title: "complete SASS helper functions" },
            { taskId: 6, title: " update icon sheet with @3x" },
            { taskId: 7, title: "convert logo from png to svg" }
        ];
        this.currentDate = new Date();
    }
    DashboardsComponent.prototype.ngOnInit = function () {
        if (window.innerWidth < this.config.breakpoint.desktopLG) {
            this.navMode = "over";
            this.rightSidenav2.opened = false;
        }
        if (window.innerWidth > this.config.breakpoint.desktopLG) {
            this.navMode = "side";
            this.rightSidenav2.open();
        }
    };
    DashboardsComponent.prototype.onResize = function (event) {
        if (event.target.innerWidth < this.config.breakpoint.desktopLG) {
            this.navMode = "over";
            this.rightSidenav2.close();
        }
        if (event.target.innerWidth > this.config.breakpoint.desktopLG) {
            this.navMode = "side";
            this.rightSidenav2.open();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("rightSidenav2"),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_material__["h" /* MdSidenav */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_material__["h" /* MdSidenav */]) === "function" && _a || Object)
    ], DashboardsComponent.prototype, "rightSidenav2", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])("window:resize", ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DashboardsComponent.prototype, "onResize", null);
    DashboardsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: ".content_inner_wrapper",
            template: __webpack_require__("./src/app/pages/dashboards/dashboards.component.html"),
            styles: [__webpack_require__("./src/app/pages/dashboards/dashboards.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].Emulated
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_config_config_service__["a" /* ConfigService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_config_config_service__["a" /* ConfigService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__app_state__["a" /* GlobalState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__app_state__["a" /* GlobalState */]) === "function" && _d || Object])
    ], DashboardsComponent);
    return DashboardsComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=dashboards.component.js.map

/***/ }),

/***/ "./src/app/pages/dashboards/dashboards.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardsModule", function() { return DashboardsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboards_component__ = __webpack_require__("./src/app/pages/dashboards/dashboards.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_shared_module__ = __webpack_require__("./src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var DASHBOARDS_ROUTE = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_3__dashboards_component__["a" /* DashboardsComponent */] },
];
var DashboardsModule = /** @class */ (function () {
    function DashboardsModule() {
    }
    DashboardsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_3__dashboards_component__["a" /* DashboardsComponent */]],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_4__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* RouterModule */].forChild(DASHBOARDS_ROUTE)
            ]
        })
    ], DashboardsModule);
    return DashboardsModule;
}());

//# sourceMappingURL=dashboards.module.js.map

/***/ })

});
//# sourceMappingURL=dashboards.module.chunk.js.map