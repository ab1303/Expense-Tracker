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
var DetachedToolbarLeftComponent = /** @class */ (function () {
    function DetachedToolbarLeftComponent(config, _elementRef, _state) {
        this.config = config;
        this._elementRef = _elementRef;
        this._state = _state;
    }
    DetachedToolbarLeftComponent.prototype.ngOnInit = function () {
    };
    DetachedToolbarLeftComponent = __decorate([
        core_1.Component({
            selector: '.content_inner_wrapper',
            templateUrl: './detached-toolbar-left.component.html',
            styleUrls: ['./detached-toolbar-left.component.scss'],
            encapsulation: core_1.ViewEncapsulation.Emulated,
        }),
        __metadata("design:paramtypes", [config_service_1.ConfigService, core_1.ElementRef, app_state_1.GlobalState])
    ], DetachedToolbarLeftComponent);
    return DetachedToolbarLeftComponent;
}());
exports.DetachedToolbarLeftComponent = DetachedToolbarLeftComponent;
//# sourceMappingURL=detached-toolbar-left.component.js.map