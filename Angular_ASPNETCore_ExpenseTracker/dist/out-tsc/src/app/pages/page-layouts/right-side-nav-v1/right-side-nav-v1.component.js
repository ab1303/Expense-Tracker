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
var RightSideNavV1Component = /** @class */ (function () {
    function RightSideNavV1Component(renderer, config, _elementRef, _state) {
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
    RightSideNavV1Component.prototype.selectTab = function (tab_id, event) {
        this.staticTabs.tabs[tab_id].active = true;
    };
    RightSideNavV1Component.prototype.ngAfterViewInit = function () {
        var _this = this;
        window.setTimeout(function () {
            return _this.renderer.invokeElementMethod(_this.allMElementRef.nativeElement, "click", []);
        });
    };
    RightSideNavV1Component.prototype.ngOnInit = function () {
        if (window.innerWidth < 992) {
            this.navMode = "over";
            this.rightSidenav1.opened = false;
        }
        if (window.innerWidth > 992) {
            this.navMode = "side";
            this.rightSidenav1.open();
        }
    };
    RightSideNavV1Component.prototype.onResize = function (event) {
        if (event.target.innerWidth < 992) {
            this.navMode = "over";
            this.rightSidenav1.close();
        }
        if (event.target.innerWidth > 992) {
            this.navMode = "side";
            this.rightSidenav1.open();
        }
    };
    __decorate([
        core_1.ViewChild("staticTabs"),
        __metadata("design:type", ngx_bootstrap_1.TabsetComponent)
    ], RightSideNavV1Component.prototype, "staticTabs", void 0);
    __decorate([
        core_1.ViewChild("rightSidenav1"),
        __metadata("design:type", material_1.MdSidenav)
    ], RightSideNavV1Component.prototype, "rightSidenav1", void 0);
    __decorate([
        core_1.ViewChild("menuTabs"),
        __metadata("design:type", Object)
    ], RightSideNavV1Component.prototype, "allMElementRef", void 0);
    __decorate([
        core_1.HostListener("window:resize", ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], RightSideNavV1Component.prototype, "onResize", null);
    RightSideNavV1Component = __decorate([
        core_1.Component({
            selector: ".content_inner_wrapper",
            templateUrl: "./right-side-nav-v1.component.html",
            styleUrls: ["./right-side-nav-v1.component.scss"],
            encapsulation: core_1.ViewEncapsulation.Emulated
        }),
        __param(0, core_1.Inject(core_1.Renderer)),
        __metadata("design:paramtypes", [core_1.Renderer,
            config_service_1.ConfigService,
            core_1.ElementRef,
            app_state_1.GlobalState])
    ], RightSideNavV1Component);
    return RightSideNavV1Component;
}());
exports.RightSideNavV1Component = RightSideNavV1Component;
//# sourceMappingURL=right-side-nav-v1.component.js.map