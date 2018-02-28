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
var app_state_1 = require("../../../app.state");
var config_service_1 = require("../../../shared/services/config/config.service");
var material_1 = require("@angular/material");
var LeftSideNavV2Component = /** @class */ (function () {
    function LeftSideNavV2Component(config, _elementRef, _state) {
        this.config = config;
        this._elementRef = _elementRef;
        this._state = _state;
        this.navMode = 'side';
    }
    LeftSideNavV2Component.prototype.ngOnInit = function () {
        if (window.innerWidth < 992) {
            this.navMode = 'over';
            this.leftSidenav2.opened = false;
        }
        if (window.innerWidth > 992) {
            this.navMode = 'side';
            this.leftSidenav2.open();
        }
    };
    LeftSideNavV2Component.prototype.onResize = function (event) {
        if (event.target.innerWidth < 992) {
            this.navMode = 'over';
            this.leftSidenav2.close();
        }
        if (event.target.innerWidth > 992) {
            this.navMode = 'side';
            this.leftSidenav2.open();
        }
    };
    __decorate([
        core_1.ViewChild('leftSidenav2'),
        __metadata("design:type", material_1.MdSidenav)
    ], LeftSideNavV2Component.prototype, "leftSidenav2", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], LeftSideNavV2Component.prototype, "onResize", null);
    LeftSideNavV2Component = __decorate([
        core_1.Component({
            selector: '.content_inner_wrapper',
            templateUrl: './left-side-nav-v2.component.html',
            styleUrls: ['./left-side-nav-v2.component.scss'],
            encapsulation: core_1.ViewEncapsulation.Emulated,
        }),
        __metadata("design:paramtypes", [config_service_1.ConfigService, core_1.ElementRef, app_state_1.GlobalState])
    ], LeftSideNavV2Component);
    return LeftSideNavV2Component;
}());
exports.LeftSideNavV2Component = LeftSideNavV2Component;
//# sourceMappingURL=left-side-nav-v2.component.js.map