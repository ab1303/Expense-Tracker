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
var core_1 = require("@angular/core");
var app_state_1 = require("../../app.state");
var config_service_1 = require("../../shared/services/config/config.service");
var material_1 = require("@angular/material");
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
        core_1.ViewChild("rightSidenav2"),
        __metadata("design:type", material_1.MdSidenav)
    ], DashboardsComponent.prototype, "rightSidenav2", void 0);
    __decorate([
        core_1.HostListener("window:resize", ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DashboardsComponent.prototype, "onResize", null);
    DashboardsComponent = __decorate([
        core_1.Component({
            selector: ".content_inner_wrapper",
            templateUrl: "./dashboards.component.html",
            styleUrls: ["./dashboards.component.scss"],
            encapsulation: core_1.ViewEncapsulation.Emulated
        }),
        __metadata("design:paramtypes", [config_service_1.ConfigService,
            core_1.ElementRef,
            app_state_1.GlobalState])
    ], DashboardsComponent);
    return DashboardsComponent;
}());
exports.DashboardsComponent = DashboardsComponent;
//# sourceMappingURL=dashboards.component.js.map