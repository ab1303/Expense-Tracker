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
var FullWidthV1Component = /** @class */ (function () {
    function FullWidthV1Component() {
    }
    FullWidthV1Component.prototype.ngOnInit = function () {
    };
    FullWidthV1Component = __decorate([
        core_1.Component({
            selector: '.content_inner_wrapper',
            templateUrl: './full-width-v1.component.html',
            styleUrls: ['./full-width-v1.component.scss'],
            encapsulation: core_1.ViewEncapsulation.Emulated,
        }),
        __metadata("design:paramtypes", [])
    ], FullWidthV1Component);
    return FullWidthV1Component;
}());
exports.FullWidthV1Component = FullWidthV1Component;
//# sourceMappingURL=full-width-v1.component.js.map