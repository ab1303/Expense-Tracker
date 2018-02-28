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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_state_1 = require("../../../app.state");
var config_service_1 = require("../../../shared/services/config/config.service");
var material_1 = require("@angular/material");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var LeftSideNavV1Component = /** @class */ (function () {
    function LeftSideNavV1Component(renderer, config, _elementRef, _state) {
        this.renderer = renderer;
        this.config = config;
        this._elementRef = _elementRef;
        this._state = _state;
        this.navMode = "side";
        this.isActiveTab = false;
        this.tabLabels = [
            { label: "Sidenav item 1" },
            { label: "Sidenav item 2" },
            { label: "Sidenav item 3" }
        ];
    }
    LeftSideNavV1Component.prototype.selectTab = function (tab_id, event) {
        this.staticTabs.tabs[tab_id].active = true;
    };
    LeftSideNavV1Component.prototype.ngAfterViewInit = function () {
        var _this = this;
        window.setTimeout(function () {
            return _this.renderer.invokeElementMethod(_this.allMElementRef.nativeElement, "click", []);
        });
    };
    LeftSideNavV1Component.prototype.ngOnInit = function () {
        if (window.innerWidth < this.config.breakpoint.desktop) {
            this.navMode = "over";
            this.leftSidenav1.opened = false;
        }
        if (window.innerWidth > this.config.breakpoint.desktop) {
            this.navMode = "side";
            this.leftSidenav1.open();
        }
    };
    LeftSideNavV1Component.prototype.onResize = function (event) {
        if (event.target.innerWidth < this.config.breakpoint.desktop) {
            this.navMode = "over";
            this.leftSidenav1.close();
        }
        if (event.target.innerWidth > this.config.breakpoint.desktop) {
            this.navMode = "side";
            this.leftSidenav1.open();
        }
    };
    __decorate([
        core_1.ViewChild("staticTabs"),
        __metadata("design:type", ngx_bootstrap_1.TabsetComponent)
    ], LeftSideNavV1Component.prototype, "staticTabs", void 0);
    __decorate([
        core_1.ViewChild("leftSidenav1"),
        __metadata("design:type", material_1.MdSidenav)
    ], LeftSideNavV1Component.prototype, "leftSidenav1", void 0);
    __decorate([
        core_1.ViewChild("menuTabs"),
        __metadata("design:type", Object)
    ], LeftSideNavV1Component.prototype, "allMElementRef", void 0);
    __decorate([
        core_1.HostListener("window:resize", ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], LeftSideNavV1Component.prototype, "onResize", null);
    LeftSideNavV1Component = __decorate([
        core_1.Component({
            selector: ".content_inner_wrapper",
            templateUrl: "./left-side-nav-v1.component.html",
            styleUrls: ["./left-side-nav-v1.component.scss"],
            encapsulation: core_1.ViewEncapsulation.Emulated
        }),
        __param(0, core_1.Inject(core_1.Renderer)),
        __metadata("design:paramtypes", [core_1.Renderer,
            config_service_1.ConfigService,
            core_1.ElementRef,
            app_state_1.GlobalState])
    ], LeftSideNavV1Component);
    return LeftSideNavV1Component;
}());
exports.LeftSideNavV1Component = LeftSideNavV1Component;
//# sourceMappingURL=left-side-nav-v1.component.js.map