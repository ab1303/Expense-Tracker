webpackJsonp(["layout.module"],{

/***/ "./node_modules/ngx-perfect-scrollbar/dist/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__("./node_modules/ngx-perfect-scrollbar/dist/lib/index.js");
exports.PerfectScrollbarComponent = index_1.PerfectScrollbarComponent;
exports.PerfectScrollbarDirective = index_1.PerfectScrollbarDirective;
exports.PerfectScrollbarConfig = index_1.PerfectScrollbarConfig;
exports.provideDefaultConfig = index_1.provideDefaultConfig;
exports.provideForRootGuard = index_1.provideForRootGuard;
exports.PERFECT_SCROLLBAR_GUARD = index_1.PERFECT_SCROLLBAR_GUARD;
exports.PERFECT_SCROLLBAR_CONFIG = index_1.PERFECT_SCROLLBAR_CONFIG;
exports.PerfectScrollbarModule = index_1.PerfectScrollbarModule;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ngx-perfect-scrollbar/dist/lib/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var perfect_scrollbar_component_1 = __webpack_require__("./node_modules/ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.component.js");
exports.PerfectScrollbarComponent = perfect_scrollbar_component_1.PerfectScrollbarComponent;
var perfect_scrollbar_directive_1 = __webpack_require__("./node_modules/ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.directive.js");
exports.PerfectScrollbarDirective = perfect_scrollbar_directive_1.PerfectScrollbarDirective;
var perfect_scrollbar_interfaces_1 = __webpack_require__("./node_modules/ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.interfaces.js");
exports.PerfectScrollbarConfig = perfect_scrollbar_interfaces_1.PerfectScrollbarConfig;
var perfect_scrollbar_module_1 = __webpack_require__("./node_modules/ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.module.js");
exports.provideDefaultConfig = perfect_scrollbar_module_1.provideDefaultConfig;
exports.provideForRootGuard = perfect_scrollbar_module_1.provideForRootGuard;
exports.PERFECT_SCROLLBAR_GUARD = perfect_scrollbar_module_1.PERFECT_SCROLLBAR_GUARD;
exports.PERFECT_SCROLLBAR_CONFIG = perfect_scrollbar_module_1.PERFECT_SCROLLBAR_CONFIG;
exports.PerfectScrollbarModule = perfect_scrollbar_module_1.PerfectScrollbarModule;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.component.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__("./node_modules/rxjs/add/operator/throttleTime.js");
__webpack_require__("./node_modules/rxjs/add/operator/distinctUntilChanged.js");
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var core_2 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var core_3 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var perfect_scrollbar_directive_1 = __webpack_require__("./node_modules/ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.directive.js");
var PerfectScrollbarComponent = /** @class */ (function () {
    function PerfectScrollbarComponent(elementRef, cdRef) {
        this.elementRef = elementRef;
        this.cdRef = cdRef;
        this.states = {};
        this.notify = null;
        this.userInteraction = false;
        this.allowPropagation = false;
        this.cancelEvent = null;
        this.timeoutState = null;
        this.timeoutScroll = null;
        this.usePropagationX = false;
        this.usePropagationY = false;
        this.statesSub = null;
        this.statesUpdate = new Subject_1.Subject();
        this.activeSub = null;
        this.activeUpdate = new Subject_1.Subject();
        this.fxShow = true;
        this.fxHide = false;
        this.hidden = false;
        this.disabled = false;
        this.usePSClass = true;
        this.autoPropagation = false;
        this.scrollIndicators = false;
        this.runInsideAngular = false;
    }
    PerfectScrollbarComponent.prototype.onGeneratedEvent = function (event) {
        // Stop the generated event from reaching window for PS to work correctly
        if (event['psGenerated']) {
            event.stopPropagation();
        }
    };
    PerfectScrollbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeSub = this.activeUpdate
            .distinctUntilChanged()
            .subscribe(function (active) {
            _this.allowPropagation = active;
        });
        this.statesSub = this.statesUpdate
            .distinctUntilChanged()
            .subscribe(function (state) {
            window.clearTimeout(_this.timeoutState);
            if (state !== 'x' && state !== 'y') {
                _this.notify = true;
                _this.states[state] = true;
                _this.timeoutState = window.setTimeout(function () {
                    _this.notify = false;
                    if (_this.autoPropagation && _this.userInteraction &&
                        ((!_this.usePropagationX && (_this.states.left || _this.states.right)) ||
                            (!_this.usePropagationY && (_this.states.top || _this.states.bottom)))) {
                        _this.allowPropagation = true;
                    }
                    _this.cdRef.markForCheck();
                }, 300);
            }
            else {
                _this.notify = false;
                if (state === 'x') {
                    _this.states.left = false;
                    _this.states.right = false;
                }
                else if (state === 'y') {
                    _this.states.top = false;
                    _this.states.bottom = false;
                }
                _this.userInteraction = true;
                if (_this.autoPropagation &&
                    (!_this.usePropagationX || !_this.usePropagationY)) {
                    _this.allowPropagation = false;
                    if (_this.cancelEvent) {
                        _this.elementRef.nativeElement.dispatchEvent(_this.cancelEvent);
                        _this.cancelEvent = null;
                    }
                }
                else if (_this.scrollIndicators) {
                    _this.notify = true;
                    _this.timeoutState = window.setTimeout(function () {
                        _this.notify = false;
                        _this.cdRef.markForCheck();
                    }, 300);
                }
            }
            _this.cdRef.markForCheck();
        });
    };
    PerfectScrollbarComponent.prototype.ngOnDestroy = function () {
        if (this.activeSub) {
            this.activeSub.unsubscribe();
        }
        if (this.statesSub) {
            this.statesSub.unsubscribe();
        }
        window.clearTimeout(this.timeoutState);
        window.clearTimeout(this.timeoutScroll);
    };
    PerfectScrollbarComponent.prototype.ngDoCheck = function () {
        if (!this.disabled && this.autoPropagation && this.directiveRef) {
            var element = this.directiveRef.elementRef.nativeElement;
            this.usePropagationX = !element.classList.contains('ps--active-x');
            this.usePropagationY = !element.classList.contains('ps--active-y');
            this.activeUpdate.next(this.usePropagationX && this.usePropagationY);
        }
    };
    PerfectScrollbarComponent.prototype.getConfig = function () {
        var config = this.config || {};
        if (this.autoPropagation) {
            config.swipePropagation = true;
            config.wheelPropagation = true;
        }
        return config;
    };
    PerfectScrollbarComponent.prototype.update = function () {
        console.warn('Deprecated function, update needs to be called through directiveRef!');
        this.directiveRef.update();
    };
    PerfectScrollbarComponent.prototype.scrollTo = function (x, y) {
        console.warn('Deprecated function, scrollTo needs to be called through directiveRef!');
        this.directiveRef.scrollTo(x, y);
    };
    PerfectScrollbarComponent.prototype.scrollToTop = function (offset) {
        if (offset === void 0) { offset = 0; }
        console.warn('Deprecated function, scrollToTop needs to be called through directiveRef!');
        this.directiveRef.scrollToTop(offset);
    };
    PerfectScrollbarComponent.prototype.scrollToLeft = function (offset) {
        if (offset === void 0) { offset = 0; }
        console.warn('Deprecated function, scrollToLeft needs to be called through directiveRef!');
        this.directiveRef.scrollToLeft(offset);
    };
    PerfectScrollbarComponent.prototype.scrollToRight = function (offset) {
        if (offset === void 0) { offset = 0; }
        console.warn('Deprecated function, scrollToRight needs to be called through directiveRef!');
        this.directiveRef.scrollToRight(offset);
    };
    PerfectScrollbarComponent.prototype.scrollToBottom = function (offset) {
        if (offset === void 0) { offset = 0; }
        console.warn('Deprecated function, scrollToBottom needs to be called through directiveRef!');
        this.directiveRef.scrollToBottom(offset);
    };
    PerfectScrollbarComponent.prototype.onTouchEnd = function (event) {
        if (event === void 0) { event = null; }
        if (!this.disabled && this.autoPropagation &&
            (!this.usePropagationX || !this.usePropagationY)) {
            this.cancelEvent = null;
            this.allowPropagation = false;
        }
    };
    PerfectScrollbarComponent.prototype.onTouchMove = function (event) {
        if (event === void 0) { event = null; }
        if (!this.disabled && this.autoPropagation && !this.allowPropagation) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    PerfectScrollbarComponent.prototype.onTouchStart = function (event) {
        if (event === void 0) { event = null; }
        if (!this.disabled && this.autoPropagation) {
            this.userInteraction = true;
            if (this.allowPropagation) {
                // PS stops the touchmove event so lets re-emit it here
                if (this.elementRef.nativeElement) {
                    var newEvent = new MouseEvent('touchstart', event);
                    this.cancelEvent = new MouseEvent('touchmove', event);
                    newEvent['psGenerated'] = this.cancelEvent['psGenerated'] = true;
                    newEvent['touches'] = this.cancelEvent['touches'] = event['touches'];
                    newEvent['targetTouches'] = this.cancelEvent['targetTouches'] = event['targetTouches'];
                    this.elementRef.nativeElement.dispatchEvent(newEvent);
                }
            }
            this.cdRef.detectChanges();
        }
    };
    PerfectScrollbarComponent.prototype.onWheelEvent = function (event) {
        if (event === void 0) { event = null; }
        if (!this.disabled && this.autoPropagation) {
            this.userInteraction = true;
            if (!this.allowPropagation) {
                event.preventDefault();
                event.stopPropagation();
            }
            else if (!this.usePropagationX || !this.usePropagationY) {
                this.allowPropagation = false;
            }
            this.cdRef.detectChanges();
        }
    };
    PerfectScrollbarComponent.prototype.onScrollEvent = function (event, state) {
        if (event === void 0) { event = null; }
        if (!this.disabled && event.currentTarget === event.target &&
            (this.autoPropagation || this.scrollIndicators)) {
            this.statesUpdate.next(state);
        }
    };
    PerfectScrollbarComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'perfect-scrollbar',
                    template: '<div #ps="ngxPerfectScrollbar" [perfectScrollbar]="getConfig()" [hidden]="hidden" [fxHide]="fxHide" [fxShow]="fxShow" [disabled]="disabled" [usePSClass]="usePSClass" [psPosStyle]="null" [runInsideAngular]="runInsideAngular" (wheel)="onWheelEvent($event)" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)" (touchend)="onTouchEnd($event)" (ps-scroll-x)="onScrollEvent($event, \'x\')" (ps-scroll-y)="onScrollEvent($event, \'y\')" (ps-x-reach-end)="onScrollEvent($event, \'right\')" (ps-y-reach-end)="onScrollEvent($event, \'bottom\')" (ps-x-reach-start)="onScrollEvent($event, \'left\')" (ps-y-reach-start)="onScrollEvent($event, \'top\')"><div class="ps-content"><ng-content></ng-content></div><div *ngIf="autoPropagation || scrollIndicators" class="ps-overlay" [class.ps-at-top]="states.top" [class.ps-at-left]="states.left" [class.ps-at-right]="states.right" [class.ps-at-bottom]="states.bottom"><div class="ps-indicator-top" [class.ps-notify]="notify && userInteraction"></div><div class="ps-indicator-left" [class.ps-notify]="notify && userInteraction"></div><div class="ps-indicator-right" [class.ps-notify]="notify && userInteraction"></div><div class="ps-indicator-bottom" [class.ps-notify]="notify && userInteraction"></div></div></div>',
                    styles: ['.ps{-ms-touch-action:auto;touch-action:auto;overflow:hidden!important;-ms-overflow-style:none}@supports (-ms-overflow-style:none){.ps{overflow:auto!important}}@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){.ps{overflow:auto!important}}.ps.ps--active-x>.ps__scrollbar-x-rail,.ps.ps--active-y>.ps__scrollbar-y-rail{display:block;background-color:transparent}.ps.ps--in-scrolling.ps--x>.ps__scrollbar-x-rail{background-color:#eee;opacity:.9}.ps.ps--in-scrolling.ps--x>.ps__scrollbar-x-rail>.ps__scrollbar-x{background-color:#999;height:11px}.ps.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail{background-color:#eee;opacity:.9}.ps.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail>.ps__scrollbar-y{background-color:#999;width:11px}.ps>.ps__scrollbar-x-rail{display:none;position:absolute;opacity:0;-webkit-transition:background-color .2s linear,opacity .2s linear;-o-transition:background-color .2s linear,opacity .2s linear;-moz-transition:background-color .2s linear,opacity .2s linear;transition:background-color .2s linear,opacity .2s linear;bottom:0;height:15px}.ps>.ps__scrollbar-x-rail>.ps__scrollbar-x{position:absolute;background-color:#aaa;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-transition:background-color .2s linear,height .2s linear,width .2s ease-in-out,-webkit-border-radius .2s ease-in-out;-o-transition:background-color .2s linear,height .2s linear,width .2s ease-in-out,border-radius .2s ease-in-out;-moz-transition:background-color .2s linear,height .2s linear,width .2s ease-in-out,border-radius .2s ease-in-out,-moz-border-radius .2s ease-in-out;transition:background-color .2s linear,height .2s linear,width .2s ease-in-out,border-radius .2s ease-in-out;transition:background-color .2s linear,height .2s linear,width .2s ease-in-out,border-radius .2s ease-in-out,-webkit-border-radius .2s ease-in-out,-moz-border-radius .2s ease-in-out;bottom:2px;height:6px}.ps>.ps__scrollbar-x-rail:active>.ps__scrollbar-x,.ps>.ps__scrollbar-x-rail:hover>.ps__scrollbar-x{height:11px}.ps>.ps__scrollbar-y-rail{display:none;position:absolute;opacity:0;-webkit-transition:background-color .2s linear,opacity .2s linear;-o-transition:background-color .2s linear,opacity .2s linear;-moz-transition:background-color .2s linear,opacity .2s linear;transition:background-color .2s linear,opacity .2s linear;right:0;width:15px}.ps>.ps__scrollbar-y-rail>.ps__scrollbar-y{position:absolute;background-color:#aaa;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-transition:background-color .2s linear,height .2s linear,width .2s ease-in-out,-webkit-border-radius .2s ease-in-out;-o-transition:background-color .2s linear,height .2s linear,width .2s ease-in-out,border-radius .2s ease-in-out;-moz-transition:background-color .2s linear,height .2s linear,width .2s ease-in-out,border-radius .2s ease-in-out,-moz-border-radius .2s ease-in-out;transition:background-color .2s linear,height .2s linear,width .2s ease-in-out,border-radius .2s ease-in-out;transition:background-color .2s linear,height .2s linear,width .2s ease-in-out,border-radius .2s ease-in-out,-webkit-border-radius .2s ease-in-out,-moz-border-radius .2s ease-in-out;right:2px;width:6px}.ps>.ps__scrollbar-y-rail:active>.ps__scrollbar-y,.ps>.ps__scrollbar-y-rail:hover>.ps__scrollbar-y{width:11px}.ps:hover.ps--in-scrolling.ps--x>.ps__scrollbar-x-rail{background-color:#eee;opacity:.9}.ps:hover.ps--in-scrolling.ps--x>.ps__scrollbar-x-rail>.ps__scrollbar-x{background-color:#999;height:11px}.ps:hover.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail{background-color:#eee;opacity:.9}.ps:hover.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail>.ps__scrollbar-y{background-color:#999;width:11px}.ps:hover>.ps__scrollbar-x-rail,.ps:hover>.ps__scrollbar-y-rail{opacity:.6}.ps:hover>.ps__scrollbar-x-rail:hover{background-color:#eee;opacity:.9}.ps:hover>.ps__scrollbar-x-rail:hover>.ps__scrollbar-x{background-color:#999}.ps:hover>.ps__scrollbar-y-rail:hover{background-color:#eee;opacity:.9}.ps:hover>.ps__scrollbar-y-rail:hover>.ps__scrollbar-y{background-color:#999}perfect-scrollbar{position:relative;display:block;height:100%}perfect-scrollbar[hidden]{display:none}perfect-scrollbar[fxflex],perfect-scrollbar[fxflexfill],perfect-scrollbar[fxlayout]{display:flex;flex-direction:inherit;-webkit-box-orient:inherit;-webkit-box-direction:inherit;height:auto;min-width:0;min-height:0}perfect-scrollbar[fxflex]>.ps,perfect-scrollbar[fxflex]>.ps>.ps-content,perfect-scrollbar[fxflexfill]>.ps,perfect-scrollbar[fxflexfill]>.ps>.ps-content,perfect-scrollbar[fxlayout]>.ps,perfect-scrollbar[fxlayout]>.ps>.ps-content{display:flex;flex:1 1 auto;-webkit-box-flex:1;-ms-flex:1 1 auto;flex-direction:inherit;-webkit-box-orient:inherit;-webkit-box-direction:inherit;width:auto;height:auto;min-width:0;min-height:0}perfect-scrollbar>.ps{position:static;display:block;width:100%;height:100%}perfect-scrollbar>.ps>.ps-overlay{position:absolute;top:0;right:0;bottom:0;left:0;display:block;overflow:hidden;pointer-events:none}perfect-scrollbar>.ps>.ps-overlay .ps-indicator-bottom,perfect-scrollbar>.ps>.ps-overlay .ps-indicator-left,perfect-scrollbar>.ps>.ps-overlay .ps-indicator-right,perfect-scrollbar>.ps>.ps-overlay .ps-indicator-top{position:absolute;opacity:0;transition:opacity .3s ease-in-out}perfect-scrollbar>.ps>.ps-overlay .ps-indicator-bottom,perfect-scrollbar>.ps>.ps-overlay .ps-indicator-top{left:0;min-width:100%;min-height:24px}perfect-scrollbar>.ps>.ps-overlay .ps-indicator-left,perfect-scrollbar>.ps>.ps-overlay .ps-indicator-right{top:0;min-width:24px;min-height:100%}perfect-scrollbar>.ps>.ps-overlay .ps-indicator-top{top:0}perfect-scrollbar>.ps>.ps-overlay .ps-indicator-left{left:0}perfect-scrollbar>.ps>.ps-overlay .ps-indicator-right{right:0}perfect-scrollbar>.ps>.ps-overlay .ps-indicator-bottom{bottom:0}perfect-scrollbar>.ps.ps--active-y>.ps__scrollbar-y-rail{top:0!important;right:0!important}perfect-scrollbar>.ps.ps--active-x>.ps__scrollbar-x-rail{bottom:0!important;left:0!important}perfect-scrollbar>.ps.ps--active-x.ps--active-y>.ps__scrollbar-y-rail{margin:0 0 10px}perfect-scrollbar>.ps.ps--active-x.ps--active-y>.ps__scrollbar-x-rail{margin:0 10px 0 0}perfect-scrollbar>.ps.ps--in-scrolling.ps--x>.ps__scrollbar-x-rail,perfect-scrollbar>.ps.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail{opacity:.9;background-color:#eee}perfect-scrollbar.ps-spacing-sm,perfect-scrollbar.ps-spacing-tn,perfect-scrollbar.ps-spacing-xs{padding:0 12px 12px 0;margin:0 -12px -12px 0}perfect-scrollbar.ps-spacing-sm>.ps>.ps-overlay,perfect-scrollbar.ps-spacing-tn>.ps>.ps-overlay,perfect-scrollbar.ps-spacing-xs>.ps>.ps-overlay{right:12px;bottom:12px}perfect-scrollbar.ps-spacing-lg,perfect-scrollbar.ps-spacing-md,perfect-scrollbar.ps-spacing-xl{padding:0 24px 24px 0;margin:0 -24px -24px 0}perfect-scrollbar.ps-spacing-lg>.ps>.ps-overlay,perfect-scrollbar.ps-spacing-md>.ps>.ps-overlay,perfect-scrollbar.ps-spacing-xl>.ps>.ps-overlay{right:24px;bottom:24px}perfect-scrollbar.ps-show-always>.ps.ps--active-x>.ps__scrollbar-x-rail,perfect-scrollbar.ps-show-always>.ps.ps--active-y>.ps__scrollbar-y-rail{opacity:.6}perfect-scrollbar.ps-show-active>.ps.ps--active-y>.ps-overlay:not(.ps-at-top) .ps-indicator-top{opacity:1;background:linear-gradient(to bottom,rgba(255,255,255,.5) 0,rgba(255,255,255,0) 100%)}perfect-scrollbar.ps-show-active>.ps.ps--active-y>.ps-overlay:not(.ps-at-bottom) .ps-indicator-bottom{opacity:1;background:linear-gradient(to top,rgba(255,255,255,.5) 0,rgba(255,255,255,0) 100%)}perfect-scrollbar.ps-show-active>.ps.ps--active-x>.ps-overlay:not(.ps-at-left) .ps-indicator-left{opacity:1;background:linear-gradient(to right,rgba(255,255,255,.5) 0,rgba(255,255,255,0) 100%)}perfect-scrollbar.ps-show-active>.ps.ps--active-x>.ps-overlay:not(.ps-at-right) .ps-indicator-right{opacity:1;background:linear-gradient(to left,rgba(255,255,255,.5) 0,rgba(255,255,255,0) 100%)}perfect-scrollbar.ps-show-active.ps-show-limits>.ps.ps--active-y>.ps-overlay.ps-at-top .ps-indicator-top{background:linear-gradient(to bottom,rgba(170,170,170,.5) 0,rgba(170,170,170,0) 100%)}perfect-scrollbar.ps-show-active.ps-show-limits>.ps.ps--active-y>.ps-overlay.ps-at-top .ps-indicator-top.ps-notify{opacity:1}perfect-scrollbar.ps-show-active.ps-show-limits>.ps.ps--active-y>.ps-overlay.ps-at-bottom .ps-indicator-bottom{background:linear-gradient(to top,rgba(170,170,170,.5) 0,rgba(170,170,170,0) 100%)}perfect-scrollbar.ps-show-active.ps-show-limits>.ps.ps--active-y>.ps-overlay.ps-at-bottom .ps-indicator-bottom.ps-notify{opacity:1}perfect-scrollbar.ps-show-active.ps-show-limits>.ps.ps--active-x>.ps-overlay.ps-at-left .ps-indicator-left{background:linear-gradient(to right,rgba(170,170,170,.5) 0,rgba(170,170,170,0) 100%)}perfect-scrollbar.ps-show-active.ps-show-limits>.ps.ps--active-x>.ps-overlay.ps-at-left .ps-indicator-left.ps-notify{opacity:1}perfect-scrollbar.ps-show-active.ps-show-limits>.ps.ps--active-x>.ps-overlay.ps-at-right .ps-indicator-right{background:linear-gradient(to left,rgba(170,170,170,.5) 0,rgba(170,170,170,0) 100%)}perfect-scrollbar.ps-show-active.ps-show-limits>.ps.ps--active-x>.ps-overlay.ps-at-right .ps-indicator-right.ps-notify{opacity:1}'],
                    encapsulation: core_3.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    PerfectScrollbarComponent.ctorParameters = function () { return [
        { type: core_3.ElementRef, },
        { type: core_3.ChangeDetectorRef, },
    ]; };
    PerfectScrollbarComponent.propDecorators = {
        'fxShow': [{ type: core_2.Input },],
        'fxHide': [{ type: core_2.Input },],
        'hidden': [{ type: core_2.HostBinding, args: ['hidden',] }, { type: core_2.Input },],
        'disabled': [{ type: core_2.Input },],
        'usePSClass': [{ type: core_2.Input },],
        'autoPropagation': [{ type: core_2.HostBinding, args: ['class.ps-show-limits',] }, { type: core_2.Input },],
        'scrollIndicators': [{ type: core_2.HostBinding, args: ['class.ps-show-active',] }, { type: core_2.Input },],
        'runInsideAngular': [{ type: core_2.Input },],
        'config': [{ type: core_2.Input },],
        'directiveRef': [{ type: core_2.ViewChild, args: [perfect_scrollbar_directive_1.PerfectScrollbarDirective,] },],
        'onGeneratedEvent': [{ type: core_2.HostListener, args: ['document:touchstart', ['$event'],] },],
    };
    return PerfectScrollbarComponent;
}());
exports.PerfectScrollbarComponent = PerfectScrollbarComponent;
//# sourceMappingURL=perfect-scrollbar.component.js.map

/***/ }),

/***/ "./node_modules/ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.directive.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Ps = __webpack_require__("./node_modules/perfect-scrollbar/index.js");
var resize_observer_polyfill_1 = __webpack_require__("./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var core_2 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var core_3 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var perfect_scrollbar_interfaces_1 = __webpack_require__("./node_modules/ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.interfaces.js");
var PerfectScrollbarDirective = /** @class */ (function () {
    function PerfectScrollbarDirective(defaults, zone, elementRef, differs) {
        this.defaults = defaults;
        this.zone = zone;
        this.elementRef = elementRef;
        this.differs = differs;
        this.fxShow = true;
        this.fxHide = false;
        this.hidden = false;
        this.disabled = false;
        this.usePSClass = true;
        this.psPosStyle = 'relative';
        this.runInsideAngular = false;
    }
    Object.defineProperty(PerfectScrollbarDirective.prototype, "oldConfig", {
        set: function (config) {
            console.warn('Deprecated use of perfect-scrollbar selector, use perfectScrollbar instead!');
            this.config = config;
        },
        enumerable: true,
        configurable: true
    });
    PerfectScrollbarDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this.ro) {
            this.ro.disconnect();
        }
        if (this.timeout) {
            window.clearTimeout(this.timeout);
        }
        if (this.runInsideAngular) {
            Ps.destroy(this.elementRef.nativeElement);
        }
        else {
            this.zone.runOutsideAngular(function () {
                Ps.destroy(_this.elementRef.nativeElement);
            });
        }
    };
    PerfectScrollbarDirective.prototype.ngDoCheck = function () {
        var _this = this;
        if (!this.disabled && this.configDiff) {
            var changes = this.configDiff.diff(this.config || {});
            if (changes) {
                this.ngOnDestroy();
                // Timeout is needed for the styles to update properly
                window.setTimeout(function () {
                    _this.ngAfterViewInit();
                }, 0);
            }
        }
    };
    PerfectScrollbarDirective.prototype.ngOnChanges = function (changes) {
        if (changes['fxHide']) {
            changes['hidden'] = changes['fxHide'];
        }
        else if (changes['fxShow']) {
            changes['hidden'] = changes['fxShow'];
            changes['hidden'].currentValue = !changes['fxShow'].currentValue;
            changes['hidden'].previousValue = !changes['fxShow'].previousValue;
        }
        if (changes['disabled'] && !changes['disabled'].isFirstChange()) {
            if (changes['disabled'].currentValue !== changes['disabled'].previousValue) {
                if (changes['disabled'].currentValue === true) {
                    this.ngOnDestroy();
                }
                else if (changes['disabled'].currentValue === false) {
                    this.ngAfterViewInit();
                }
            }
        }
        else if (changes['hidden'] && !changes['hidden'].isFirstChange()) {
            if (changes['hidden'].currentValue !== changes['hidden'].previousValue) {
                if (changes['hidden'].currentValue === false) {
                    this.update();
                }
            }
        }
    };
    PerfectScrollbarDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.disabled) {
            var config_1 = new perfect_scrollbar_interfaces_1.PerfectScrollbarConfig(this.defaults);
            config_1.assign(this.config);
            if (this.runInsideAngular) {
                Ps.initialize(this.elementRef.nativeElement, config_1);
            }
            else {
                this.zone.runOutsideAngular(function () {
                    Ps.initialize(_this.elementRef.nativeElement, config_1);
                });
            }
            if (!this.configDiff) {
                this.configDiff = this.differs.find(this.config || {}).create(null);
            }
            this.zone.runOutsideAngular(function () {
                _this.ro = new resize_observer_polyfill_1.default(function (entries, observer) {
                    _this.update();
                });
                _this.ro.observe(_this.elementRef.nativeElement);
            });
        }
    };
    PerfectScrollbarDirective.prototype.update = function () {
        var _this = this;
        if (this.timeout) {
            window.clearTimeout(this.timeout);
        }
        this.timeout = window.setTimeout(function () {
            if (!_this.disabled && _this.configDiff) {
                try {
                    if (_this.runInsideAngular) {
                        Ps.update(_this.elementRef.nativeElement);
                    }
                    else {
                        _this.zone.runOutsideAngular(function () {
                            Ps.update(_this.elementRef.nativeElement);
                        });
                    }
                }
                catch (error) {
                    // Update can be finished after destroy so catch errors
                }
            }
        }, 0);
    };
    PerfectScrollbarDirective.prototype.geometry = function (property) {
        if (property === void 0) { property = 'scroll'; }
        return {
            x: this.elementRef.nativeElement[property + 'Left'],
            y: this.elementRef.nativeElement[property + 'Top'],
            w: this.elementRef.nativeElement[property + 'Width'],
            h: this.elementRef.nativeElement[property + 'Height']
        };
    };
    PerfectScrollbarDirective.prototype.scrollable = function (direction) {
        if (direction === void 0) { direction = 'any'; }
        var element = this.elementRef.nativeElement;
        if (direction === 'any') {
            return element.classList.contains('ps--active-x') ||
                element.classList.contains('ps--active-y');
        }
        else if (direction === 'both') {
            return element.classList.contains('ps--active-x') &&
                element.classList.contains('ps--active-y');
        }
        else {
            return element.classList.contains('ps--active-' + direction);
        }
    };
    PerfectScrollbarDirective.prototype.scrollTo = function (x, y, speed) {
        if (!this.disabled) {
            if (y == null && speed == null) {
                console.warn('Deprecated use of scrollTo, use the scrollToY function instead!');
                this.animateScrolling('scrollTop', x, speed);
            }
            else {
                if (x != null) {
                    this.animateScrolling('scrollLeft', x, speed);
                }
                if (y != null) {
                    this.animateScrolling('scrollTop', y, speed);
                }
            }
        }
    };
    PerfectScrollbarDirective.prototype.scrollToX = function (x, speed) {
        this.animateScrolling('scrollLeft', x, speed);
    };
    PerfectScrollbarDirective.prototype.scrollToY = function (y, speed) {
        this.animateScrolling('scrollTop', y, speed);
    };
    PerfectScrollbarDirective.prototype.scrollToTop = function (offset, speed) {
        this.animateScrolling('scrollTop', (offset || 0), speed);
    };
    PerfectScrollbarDirective.prototype.scrollToLeft = function (offset, speed) {
        this.animateScrolling('scrollLeft', (offset || 0), speed);
    };
    PerfectScrollbarDirective.prototype.scrollToRight = function (offset, speed) {
        var width = this.elementRef.nativeElement.scrollWidth;
        this.animateScrolling('scrollLeft', width - (offset || 0), speed);
    };
    PerfectScrollbarDirective.prototype.scrollToBottom = function (offset, speed) {
        var height = this.elementRef.nativeElement.scrollHeight;
        this.animateScrolling('scrollTop', height - (offset || 0), speed);
    };
    PerfectScrollbarDirective.prototype.animateScrolling = function (target, value, speed) {
        var _this = this;
        if (!speed) {
            this.elementRef.nativeElement[target] = value;
            this.update();
            // PS has weird event sending order, this is a workaround for that
            this.timeout = null;
            this.update();
        }
        else if (value !== this.elementRef.nativeElement[target]) {
            var newValue_1 = 0;
            var scrollCount_1 = 0;
            var oldTimestamp_1 = performance.now();
            var oldValue_1 = this.elementRef.nativeElement[target];
            var cosParameter_1 = (oldValue_1 - value) / 2;
            var step_1 = function (newTimestamp) {
                scrollCount_1 += Math.PI / (speed / (newTimestamp - oldTimestamp_1));
                newValue_1 = Math.round(value + cosParameter_1 + cosParameter_1 * Math.cos(scrollCount_1));
                // Only continue animation if scroll position has not changed
                if (_this.elementRef.nativeElement[target] === oldValue_1) {
                    if (scrollCount_1 >= Math.PI) {
                        _this.elementRef.nativeElement[target] = value;
                        _this.update();
                        // PS has weird event sending order, this is a workaround for that
                        _this.timeout = null;
                        _this.update();
                    }
                    else {
                        _this.elementRef.nativeElement[target] = oldValue_1 = newValue_1;
                        oldTimestamp_1 = newTimestamp;
                        window.requestAnimationFrame(step_1);
                    }
                }
            };
            window.requestAnimationFrame(step_1);
        }
    };
    PerfectScrollbarDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[perfect-scrollbar], [perfectScrollbar]',
                    exportAs: 'ngxPerfectScrollbar'
                },] },
    ];
    /** @nocollapse */
    PerfectScrollbarDirective.ctorParameters = function () { return [
        { type: perfect_scrollbar_interfaces_1.PerfectScrollbarConfig, decorators: [{ type: core_1.Optional },] },
        { type: core_1.NgZone, },
        { type: core_3.ElementRef, },
        { type: core_2.KeyValueDiffers, },
    ]; };
    PerfectScrollbarDirective.propDecorators = {
        'fxShow': [{ type: core_3.Input },],
        'fxHide': [{ type: core_3.Input },],
        'hidden': [{ type: core_3.Input },],
        'disabled': [{ type: core_3.Input },],
        'usePSClass': [{ type: core_3.HostBinding, args: ['class.ps',] }, { type: core_3.Input },],
        'psPosStyle': [{ type: core_3.HostBinding, args: ['style.position',] }, { type: core_3.Input },],
        'runInsideAngular': [{ type: core_3.Input },],
        'config': [{ type: core_3.Input, args: ['perfectScrollbar',] },],
        'oldConfig': [{ type: core_3.Input, args: ['perfect-scrollbar',] },],
    };
    return PerfectScrollbarDirective;
}());
exports.PerfectScrollbarDirective = PerfectScrollbarDirective;
//# sourceMappingURL=perfect-scrollbar.directive.js.map

/***/ }),

/***/ "./node_modules/ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.interfaces.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PerfectScrollbarConfig = /** @class */ (function () {
    function PerfectScrollbarConfig(config) {
        if (config === void 0) { config = {}; }
        this.assign(config);
    }
    PerfectScrollbarConfig.prototype.assign = function (config) {
        if (config === void 0) { config = {}; }
        for (var key in config) {
            this[key] = config[key];
        }
    };
    return PerfectScrollbarConfig;
}());
exports.PerfectScrollbarConfig = PerfectScrollbarConfig;
//# sourceMappingURL=perfect-scrollbar.interfaces.js.map

/***/ }),

/***/ "./node_modules/ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.module.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var perfect_scrollbar_component_1 = __webpack_require__("./node_modules/ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.component.js");
var perfect_scrollbar_directive_1 = __webpack_require__("./node_modules/ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.directive.js");
var perfect_scrollbar_interfaces_1 = __webpack_require__("./node_modules/ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.interfaces.js");
exports.PERFECT_SCROLLBAR_GUARD = new core_1.OpaqueToken('PERFECT_SCROLLBAR_GUARD');
exports.PERFECT_SCROLLBAR_CONFIG = new core_1.OpaqueToken('PERFECT_SCROLLBAR_CONFIG');
var PerfectScrollbarModule = /** @class */ (function () {
    function PerfectScrollbarModule(guard) {
    }
    PerfectScrollbarModule.forRoot = function (config) {
        return {
            ngModule: PerfectScrollbarModule,
            providers: [
                {
                    provide: exports.PERFECT_SCROLLBAR_GUARD,
                    useFactory: provideForRootGuard,
                    deps: [
                        [
                            perfect_scrollbar_interfaces_1.PerfectScrollbarConfig,
                            new core_1.Optional(),
                            new core_1.SkipSelf()
                        ]
                    ]
                },
                {
                    provide: exports.PERFECT_SCROLLBAR_CONFIG,
                    useValue: config ? config : {}
                },
                {
                    provide: perfect_scrollbar_interfaces_1.PerfectScrollbarConfig,
                    useFactory: provideDefaultConfig,
                    deps: [
                        exports.PERFECT_SCROLLBAR_CONFIG
                    ]
                }
            ]
        };
    };
    PerfectScrollbarModule.forChild = function () {
        return {
            ngModule: PerfectScrollbarModule
        };
    };
    PerfectScrollbarModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [perfect_scrollbar_component_1.PerfectScrollbarComponent, perfect_scrollbar_directive_1.PerfectScrollbarDirective],
                    exports: [common_1.CommonModule, perfect_scrollbar_component_1.PerfectScrollbarComponent, perfect_scrollbar_directive_1.PerfectScrollbarDirective]
                },] },
    ];
    /** @nocollapse */
    PerfectScrollbarModule.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [exports.PERFECT_SCROLLBAR_GUARD,] },] },
    ]; };
    return PerfectScrollbarModule;
}());
exports.PerfectScrollbarModule = PerfectScrollbarModule;
function provideForRootGuard(config) {
    if (config) {
        throw new Error("\n      Application called PerfectScrollbarModule.forRoot() twice.\n      For submodules use PerfectScrollbarModule.forChild() instead.\n    ");
    }
    return 'guarded';
}
exports.provideForRootGuard = provideForRootGuard;
function provideDefaultConfig(config) {
    return new perfect_scrollbar_interfaces_1.PerfectScrollbarConfig(config);
}
exports.provideDefaultConfig = provideDefaultConfig;
//# sourceMappingURL=perfect-scrollbar.module.js.map

/***/ }),

/***/ "./node_modules/perfect-scrollbar/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__("./node_modules/perfect-scrollbar/src/js/main.js");


/***/ }),

/***/ "./node_modules/perfect-scrollbar/src/js/lib/dom.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DOM = {};

DOM.create = function (tagName, className) {
  var element = document.createElement(tagName);
  element.className = className;
  return element;
};

DOM.appendTo = function (child, parent) {
  parent.appendChild(child);
  return child;
};

function cssGet(element, styleName) {
  return window.getComputedStyle(element)[styleName];
}

function cssSet(element, styleName, styleValue) {
  if (typeof styleValue === 'number') {
    styleValue = styleValue.toString() + 'px';
  }
  element.style[styleName] = styleValue;
  return element;
}

function cssMultiSet(element, obj) {
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'number') {
      val = val.toString() + 'px';
    }
    element.style[key] = val;
  }
  return element;
}

DOM.css = function (element, styleNameOrObject, styleValue) {
  if (typeof styleNameOrObject === 'object') {
    // multiple set with object
    return cssMultiSet(element, styleNameOrObject);
  } else {
    if (typeof styleValue === 'undefined') {
      return cssGet(element, styleNameOrObject);
    } else {
      return cssSet(element, styleNameOrObject, styleValue);
    }
  }
};

DOM.matches = function (element, query) {
  if (typeof element.matches !== 'undefined') {
    return element.matches(query);
  } else {
    // must be IE11 and Edge
    return element.msMatchesSelector(query);
  }
};

DOM.remove = function (element) {
  if (typeof element.remove !== 'undefined') {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
};

DOM.queryChildren = function (element, selector) {
  return Array.prototype.filter.call(element.childNodes, function (child) {
    return DOM.matches(child, selector);
  });
};

module.exports = DOM;


/***/ }),

/***/ "./node_modules/perfect-scrollbar/src/js/lib/event-manager.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventElement = function (element) {
  this.element = element;
  this.events = {};
};

EventElement.prototype.bind = function (eventName, handler) {
  if (typeof this.events[eventName] === 'undefined') {
    this.events[eventName] = [];
  }
  this.events[eventName].push(handler);
  this.element.addEventListener(eventName, handler, false);
};

EventElement.prototype.unbind = function (eventName, handler) {
  var isHandlerProvided = (typeof handler !== 'undefined');
  this.events[eventName] = this.events[eventName].filter(function (hdlr) {
    if (isHandlerProvided && hdlr !== handler) {
      return true;
    }
    this.element.removeEventListener(eventName, hdlr, false);
    return false;
  }, this);
};

EventElement.prototype.unbindAll = function () {
  for (var name in this.events) {
    this.unbind(name);
  }
};

var EventManager = function () {
  this.eventElements = [];
};

EventManager.prototype.eventElement = function (element) {
  var ee = this.eventElements.filter(function (eventElement) {
    return eventElement.element === element;
  })[0];
  if (typeof ee === 'undefined') {
    ee = new EventElement(element);
    this.eventElements.push(ee);
  }
  return ee;
};

EventManager.prototype.bind = function (element, eventName, handler) {
  this.eventElement(element).bind(eventName, handler);
};

EventManager.prototype.unbind = function (element, eventName, handler) {
  this.eventElement(element).unbind(eventName, handler);
};

EventManager.prototype.unbindAll = function () {
  for (var i = 0; i < this.eventElements.length; i++) {
    this.eventElements[i].unbindAll();
  }
};

EventManager.prototype.once = function (element, eventName, handler) {
  var ee = this.eventElement(element);
  var onceHandler = function (e) {
    ee.unbind(eventName, onceHandler);
    handler(e);
  };
  ee.bind(eventName, onceHandler);
};

module.exports = EventManager;


/***/ }),

/***/ "./node_modules/perfect-scrollbar/src/js/lib/guid.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();


/***/ }),

/***/ "./node_modules/perfect-scrollbar/src/js/lib/helper.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dom = __webpack_require__("./node_modules/perfect-scrollbar/src/js/lib/dom.js");

var toInt = exports.toInt = function (x) {
  return parseInt(x, 10) || 0;
};

exports.isEditable = function (el) {
  return dom.matches(el, "input,[contenteditable]") ||
         dom.matches(el, "select,[contenteditable]") ||
         dom.matches(el, "textarea,[contenteditable]") ||
         dom.matches(el, "button,[contenteditable]");
};

exports.removePsClasses = function (element) {
  for (var i = 0; i < element.classList.length; i++) {
    var className = element.classList[i];
    if (className.indexOf('ps-') === 0) {
      element.classList.remove(className);
    }
  }
};

exports.outerWidth = function (element) {
  return toInt(dom.css(element, 'width')) +
         toInt(dom.css(element, 'paddingLeft')) +
         toInt(dom.css(element, 'paddingRight')) +
         toInt(dom.css(element, 'borderLeftWidth')) +
         toInt(dom.css(element, 'borderRightWidth'));
};

function psClasses(axis) {
  var classes = ['ps--in-scrolling'];
  var axisClasses;
  if (typeof axis === 'undefined') {
    axisClasses = ['ps--x', 'ps--y'];
  } else {
    axisClasses = ['ps--' + axis];
  }
  return classes.concat(axisClasses);
}

exports.startScrolling = function (element, axis) {
  var classes = psClasses(axis);
  for (var i = 0; i < classes.length; i++) {
    element.classList.add(classes[i]);
  }
};

exports.stopScrolling = function (element, axis) {
  var classes = psClasses(axis);
  for (var i = 0; i < classes.length; i++) {
    element.classList.remove(classes[i]);
  }
};

exports.env = {
  isWebKit: typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style,
  supportsTouch: typeof window !== 'undefined' && (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch),
  supportsIePointer: typeof window !== 'undefined' && window.navigator.msMaxTouchPoints !== null
};


/***/ }),

/***/ "./node_modules/perfect-scrollbar/src/js/main.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var destroy = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/destroy.js");
var initialize = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/initialize.js");
var update = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/update.js");

module.exports = {
  initialize: initialize,
  update: update,
  destroy: destroy
};


/***/ }),

/***/ "./node_modules/perfect-scrollbar/src/js/plugin/default-setting.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  return {
    handlers: ['click-rail', 'drag-scrollbar', 'keyboard', 'wheel', 'touch'],
    maxScrollbarLength: null,
    minScrollbarLength: null,
    scrollXMarginOffset: 0,
    scrollYMarginOffset: 0,
    suppressScrollX: false,
    suppressScrollY: false,
    swipePropagation: true,
    swipeEasing: true,
    useBothWheelAxes: false,
    wheelPropagation: false,
    wheelSpeed: 1,
    theme: 'default'
  };
};


/***/ }),

/***/ "./node_modules/perfect-scrollbar/src/js/plugin/destroy.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__("./node_modules/perfect-scrollbar/src/js/lib/helper.js");
var dom = __webpack_require__("./node_modules/perfect-scrollbar/src/js/lib/dom.js");
var instances = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/instances.js");

module.exports = function (element) {
  var i = instances.get(element);

  if (!i) {
    return;
  }

  i.event.unbindAll();
  dom.remove(i.scrollbarX);
  dom.remove(i.scrollbarY);
  dom.remove(i.scrollbarXRail);
  dom.remove(i.scrollbarYRail);
  _.removePsClasses(element);

  instances.remove(element);
};


/***/ }),

/***/ "./node_modules/perfect-scrollbar/src/js/plugin/handler/click-rail.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var instances = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/instances.js");
var updateGeometry = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/update-geometry.js");
var updateScroll = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/update-scroll.js");

function bindClickRailHandler(element, i) {
  function pageOffset(el) {
    return el.getBoundingClientRect();
  }
  var stopPropagation = function (e) { e.stopPropagation(); };

  i.event.bind(i.scrollbarY, 'click', stopPropagation);
  i.event.bind(i.scrollbarYRail, 'click', function (e) {
    var positionTop = e.pageY - window.pageYOffset - pageOffset(i.scrollbarYRail).top;
    var direction = positionTop > i.scrollbarYTop ? 1 : -1;

    updateScroll(element, 'top', element.scrollTop + direction * i.containerHeight);
    updateGeometry(element);

    e.stopPropagation();
  });

  i.event.bind(i.scrollbarX, 'click', stopPropagation);
  i.event.bind(i.scrollbarXRail, 'click', function (e) {
    var positionLeft = e.pageX - window.pageXOffset - pageOffset(i.scrollbarXRail).left;
    var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

    updateScroll(element, 'left', element.scrollLeft + direction * i.containerWidth);
    updateGeometry(element);

    e.stopPropagation();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindClickRailHandler(element, i);
};


/***/ }),

/***/ "./node_modules/perfect-scrollbar/src/js/plugin/handler/drag-scrollbar.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__("./node_modules/perfect-scrollbar/src/js/lib/helper.js");
var dom = __webpack_require__("./node_modules/perfect-scrollbar/src/js/lib/dom.js");
var instances = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/instances.js");
var updateGeometry = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/update-geometry.js");
var updateScroll = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/update-scroll.js");

function bindMouseScrollXHandler(element, i) {
  var currentLeft = null;
  var currentPageX = null;

  function updateScrollLeft(deltaX) {
    var newLeft = currentLeft + (deltaX * i.railXRatio);
    var maxLeft = Math.max(0, i.scrollbarXRail.getBoundingClientRect().left) + (i.railXRatio * (i.railXWidth - i.scrollbarXWidth));

    if (newLeft < 0) {
      i.scrollbarXLeft = 0;
    } else if (newLeft > maxLeft) {
      i.scrollbarXLeft = maxLeft;
    } else {
      i.scrollbarXLeft = newLeft;
    }

    var scrollLeft = _.toInt(i.scrollbarXLeft * (i.contentWidth - i.containerWidth) / (i.containerWidth - (i.railXRatio * i.scrollbarXWidth))) - i.negativeScrollAdjustment;
    updateScroll(element, 'left', scrollLeft);
  }

  var mouseMoveHandler = function (e) {
    updateScrollLeft(e.pageX - currentPageX);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function () {
    _.stopScrolling(element, 'x');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarX, 'mousedown', function (e) {
    currentPageX = e.pageX;
    currentLeft = _.toInt(dom.css(i.scrollbarX, 'left')) * i.railXRatio;
    _.startScrolling(element, 'x');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

function bindMouseScrollYHandler(element, i) {
  var currentTop = null;
  var currentPageY = null;

  function updateScrollTop(deltaY) {
    var newTop = currentTop + (deltaY * i.railYRatio);
    var maxTop = Math.max(0, i.scrollbarYRail.getBoundingClientRect().top) + (i.railYRatio * (i.railYHeight - i.scrollbarYHeight));

    if (newTop < 0) {
      i.scrollbarYTop = 0;
    } else if (newTop > maxTop) {
      i.scrollbarYTop = maxTop;
    } else {
      i.scrollbarYTop = newTop;
    }

    var scrollTop = _.toInt(i.scrollbarYTop * (i.contentHeight - i.containerHeight) / (i.containerHeight - (i.railYRatio * i.scrollbarYHeight)));
    updateScroll(element, 'top', scrollTop);
  }

  var mouseMoveHandler = function (e) {
    updateScrollTop(e.pageY - currentPageY);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function () {
    _.stopScrolling(element, 'y');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarY, 'mousedown', function (e) {
    currentPageY = e.pageY;
    currentTop = _.toInt(dom.css(i.scrollbarY, 'top')) * i.railYRatio;
    _.startScrolling(element, 'y');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseScrollXHandler(element, i);
  bindMouseScrollYHandler(element, i);
};


/***/ }),

/***/ "./node_modules/perfect-scrollbar/src/js/plugin/handler/keyboard.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__("./node_modules/perfect-scrollbar/src/js/lib/helper.js");
var dom = __webpack_require__("./node_modules/perfect-scrollbar/src/js/lib/dom.js");
var instances = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/instances.js");
var updateGeometry = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/update-geometry.js");
var updateScroll = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/update-scroll.js");

function bindKeyboardHandler(element, i) {
  var hovered = false;
  i.event.bind(element, 'mouseenter', function () {
    hovered = true;
  });
  i.event.bind(element, 'mouseleave', function () {
    hovered = false;
  });

  var shouldPrevent = false;
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  i.event.bind(i.ownerDocument, 'keydown', function (e) {
    if ((e.isDefaultPrevented && e.isDefaultPrevented()) || e.defaultPrevented) {
      return;
    }

    var focused = dom.matches(i.scrollbarX, ':focus') ||
                  dom.matches(i.scrollbarY, ':focus');

    if (!hovered && !focused) {
      return;
    }

    var activeElement = document.activeElement ? document.activeElement : i.ownerDocument.activeElement;
    if (activeElement) {
      if (activeElement.tagName === 'IFRAME') {
        activeElement = activeElement.contentDocument.activeElement;
      } else {
        // go deeper if element is a webcomponent
        while (activeElement.shadowRoot) {
          activeElement = activeElement.shadowRoot.activeElement;
        }
      }
      if (_.isEditable(activeElement)) {
        return;
      }
    }

    var deltaX = 0;
    var deltaY = 0;

    switch (e.which) {
    case 37: // left
      if (e.metaKey) {
        deltaX = -i.contentWidth;
      } else if (e.altKey) {
        deltaX = -i.containerWidth;
      } else {
        deltaX = -30;
      }
      break;
    case 38: // up
      if (e.metaKey) {
        deltaY = i.contentHeight;
      } else if (e.altKey) {
        deltaY = i.containerHeight;
      } else {
        deltaY = 30;
      }
      break;
    case 39: // right
      if (e.metaKey) {
        deltaX = i.contentWidth;
      } else if (e.altKey) {
        deltaX = i.containerWidth;
      } else {
        deltaX = 30;
      }
      break;
    case 40: // down
      if (e.metaKey) {
        deltaY = -i.contentHeight;
      } else if (e.altKey) {
        deltaY = -i.containerHeight;
      } else {
        deltaY = -30;
      }
      break;
    case 33: // page up
      deltaY = 90;
      break;
    case 32: // space bar
      if (e.shiftKey) {
        deltaY = 90;
      } else {
        deltaY = -90;
      }
      break;
    case 34: // page down
      deltaY = -90;
      break;
    case 35: // end
      if (e.ctrlKey) {
        deltaY = -i.contentHeight;
      } else {
        deltaY = -i.containerHeight;
      }
      break;
    case 36: // home
      if (e.ctrlKey) {
        deltaY = element.scrollTop;
      } else {
        deltaY = i.containerHeight;
      }
      break;
    default:
      return;
    }

    updateScroll(element, 'top', element.scrollTop - deltaY);
    updateScroll(element, 'left', element.scrollLeft + deltaX);
    updateGeometry(element);

    shouldPrevent = shouldPreventDefault(deltaX, deltaY);
    if (shouldPrevent) {
      e.preventDefault();
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindKeyboardHandler(element, i);
};


/***/ }),

/***/ "./node_modules/perfect-scrollbar/src/js/plugin/handler/mouse-wheel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var instances = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/instances.js");
var updateGeometry = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/update-geometry.js");
var updateScroll = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/update-scroll.js");

function bindMouseWheelHandler(element, i) {
  var shouldPrevent = false;

  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  function getDeltaFromEvent(e) {
    var deltaX = e.deltaX;
    var deltaY = -1 * e.deltaY;

    if (typeof deltaX === "undefined" || typeof deltaY === "undefined") {
      // OS X Safari
      deltaX = -1 * e.wheelDeltaX / 6;
      deltaY = e.wheelDeltaY / 6;
    }

    if (e.deltaMode && e.deltaMode === 1) {
      // Firefox in deltaMode 1: Line scrolling
      deltaX *= 10;
      deltaY *= 10;
    }

    if (deltaX !== deltaX && deltaY !== deltaY/* NaN checks */) {
      // IE in some mouse drivers
      deltaX = 0;
      deltaY = e.wheelDelta;
    }

    if (e.shiftKey) {
      // reverse axis with shift key
      return [-deltaY, -deltaX];
    }
    return [deltaX, deltaY];
  }

  function shouldBeConsumedByChild(deltaX, deltaY) {
    var child = element.querySelector('textarea:hover, select[multiple]:hover, .ps-child:hover');
    if (child) {
      var style = window.getComputedStyle(child);
      var overflow = [
        style.overflow,
        style.overflowX,
        style.overflowY
      ].join('');

      if (!overflow.match(/(scroll|auto)/)) {
        // if not scrollable
        return false;
      }

      var maxScrollTop = child.scrollHeight - child.clientHeight;
      if (maxScrollTop > 0) {
        if (!(child.scrollTop === 0 && deltaY > 0) && !(child.scrollTop === maxScrollTop && deltaY < 0)) {
          return true;
        }
      }
      var maxScrollLeft = child.scrollLeft - child.clientWidth;
      if (maxScrollLeft > 0) {
        if (!(child.scrollLeft === 0 && deltaX < 0) && !(child.scrollLeft === maxScrollLeft && deltaX > 0)) {
          return true;
        }
      }
    }
    return false;
  }

  function mousewheelHandler(e) {
    var delta = getDeltaFromEvent(e);

    var deltaX = delta[0];
    var deltaY = delta[1];

    if (shouldBeConsumedByChild(deltaX, deltaY)) {
      return;
    }

    shouldPrevent = false;
    if (!i.settings.useBothWheelAxes) {
      // deltaX will only be used for horizontal scrolling and deltaY will
      // only be used for vertical scrolling - this is the default
      updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
      updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
      // only vertical scrollbar is active and useBothWheelAxes option is
      // active, so let's scroll vertical bar using both mouse wheel axes
      if (deltaY) {
        updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
      } else {
        updateScroll(element, 'top', element.scrollTop + (deltaX * i.settings.wheelSpeed));
      }
      shouldPrevent = true;
    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
      // useBothWheelAxes and only horizontal bar is active, so use both
      // wheel axes for horizontal bar
      if (deltaX) {
        updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
      } else {
        updateScroll(element, 'left', element.scrollLeft - (deltaY * i.settings.wheelSpeed));
      }
      shouldPrevent = true;
    }

    updateGeometry(element);

    shouldPrevent = (shouldPrevent || shouldPreventDefault(deltaX, deltaY));
    if (shouldPrevent) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (typeof window.onwheel !== "undefined") {
    i.event.bind(element, 'wheel', mousewheelHandler);
  } else if (typeof window.onmousewheel !== "undefined") {
    i.event.bind(element, 'mousewheel', mousewheelHandler);
  }
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseWheelHandler(element, i);
};


/***/ }),

/***/ "./node_modules/perfect-scrollbar/src/js/plugin/handler/native-scroll.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var instances = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/instances.js");
var updateGeometry = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/update-geometry.js");

function bindNativeScrollHandler(element, i) {
  i.event.bind(element, 'scroll', function () {
    updateGeometry(element);
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindNativeScrollHandler(element, i);
};


/***/ }),

/***/ "./node_modules/perfect-scrollbar/src/js/plugin/handler/selection.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__("./node_modules/perfect-scrollbar/src/js/lib/helper.js");
var instances = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/instances.js");
var updateGeometry = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/update-geometry.js");
var updateScroll = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/update-scroll.js");

function bindSelectionHandler(element, i) {
  function getRangeNode() {
    var selection = window.getSelection ? window.getSelection() :
                    document.getSelection ? document.getSelection() : '';
    if (selection.toString().length === 0) {
      return null;
    } else {
      return selection.getRangeAt(0).commonAncestorContainer;
    }
  }

  var scrollingLoop = null;
  var scrollDiff = {top: 0, left: 0};
  function startScrolling() {
    if (!scrollingLoop) {
      scrollingLoop = setInterval(function () {
        if (!instances.get(element)) {
          clearInterval(scrollingLoop);
          return;
        }

        updateScroll(element, 'top', element.scrollTop + scrollDiff.top);
        updateScroll(element, 'left', element.scrollLeft + scrollDiff.left);
        updateGeometry(element);
      }, 50); // every .1 sec
    }
  }
  function stopScrolling() {
    if (scrollingLoop) {
      clearInterval(scrollingLoop);
      scrollingLoop = null;
    }
    _.stopScrolling(element);
  }

  var isSelected = false;
  i.event.bind(i.ownerDocument, 'selectionchange', function () {
    if (element.contains(getRangeNode())) {
      isSelected = true;
    } else {
      isSelected = false;
      stopScrolling();
    }
  });
  i.event.bind(window, 'mouseup', function () {
    if (isSelected) {
      isSelected = false;
      stopScrolling();
    }
  });
  i.event.bind(window, 'keyup', function () {
    if (isSelected) {
      isSelected = false;
      stopScrolling();
    }
  });

  i.event.bind(window, 'mousemove', function (e) {
    if (isSelected) {
      var mousePosition = {x: e.pageX, y: e.pageY};
      var containerGeometry = {
        left: element.offsetLeft,
        right: element.offsetLeft + element.offsetWidth,
        top: element.offsetTop,
        bottom: element.offsetTop + element.offsetHeight
      };

      if (mousePosition.x < containerGeometry.left + 3) {
        scrollDiff.left = -5;
        _.startScrolling(element, 'x');
      } else if (mousePosition.x > containerGeometry.right - 3) {
        scrollDiff.left = 5;
        _.startScrolling(element, 'x');
      } else {
        scrollDiff.left = 0;
      }

      if (mousePosition.y < containerGeometry.top + 3) {
        if (containerGeometry.top + 3 - mousePosition.y < 5) {
          scrollDiff.top = -5;
        } else {
          scrollDiff.top = -20;
        }
        _.startScrolling(element, 'y');
      } else if (mousePosition.y > containerGeometry.bottom - 3) {
        if (mousePosition.y - containerGeometry.bottom + 3 < 5) {
          scrollDiff.top = 5;
        } else {
          scrollDiff.top = 20;
        }
        _.startScrolling(element, 'y');
      } else {
        scrollDiff.top = 0;
      }

      if (scrollDiff.top === 0 && scrollDiff.left === 0) {
        stopScrolling();
      } else {
        startScrolling();
      }
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindSelectionHandler(element, i);
};


/***/ }),

/***/ "./node_modules/perfect-scrollbar/src/js/plugin/handler/touch.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__("./node_modules/perfect-scrollbar/src/js/lib/helper.js");
var instances = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/instances.js");
var updateGeometry = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/update-geometry.js");
var updateScroll = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/update-scroll.js");

function bindTouchHandler(element, i, supportsTouch, supportsIePointer) {
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    var scrollLeft = element.scrollLeft;
    var magnitudeX = Math.abs(deltaX);
    var magnitudeY = Math.abs(deltaY);

    if (magnitudeY > magnitudeX) {
      // user is perhaps trying to swipe up/down the page

      if (((deltaY < 0) && (scrollTop === i.contentHeight - i.containerHeight)) ||
          ((deltaY > 0) && (scrollTop === 0))) {
        return !i.settings.swipePropagation;
      }
    } else if (magnitudeX > magnitudeY) {
      // user is perhaps trying to swipe left/right across the page

      if (((deltaX < 0) && (scrollLeft === i.contentWidth - i.containerWidth)) ||
          ((deltaX > 0) && (scrollLeft === 0))) {
        return !i.settings.swipePropagation;
      }
    }

    return true;
  }

  function applyTouchMove(differenceX, differenceY) {
    updateScroll(element, 'top', element.scrollTop - differenceY);
    updateScroll(element, 'left', element.scrollLeft - differenceX);

    updateGeometry(element);
  }

  var startOffset = {};
  var startTime = 0;
  var speed = {};
  var easingLoop = null;
  var inGlobalTouch = false;
  var inLocalTouch = false;

  function globalTouchStart() {
    inGlobalTouch = true;
  }
  function globalTouchEnd() {
    inGlobalTouch = false;
  }

  function getTouch(e) {
    if (e.targetTouches) {
      return e.targetTouches[0];
    } else {
      // Maybe IE pointer
      return e;
    }
  }
  function shouldHandle(e) {
    if (e.pointerType && e.pointerType === 'pen' && e.buttons === 0) {
      return false;
    }
    if (e.targetTouches && e.targetTouches.length === 1) {
      return true;
    }
    if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
      return true;
    }
    return false;
  }
  function touchStart(e) {
    if (shouldHandle(e)) {
      inLocalTouch = true;

      var touch = getTouch(e);

      startOffset.pageX = touch.pageX;
      startOffset.pageY = touch.pageY;

      startTime = (new Date()).getTime();

      if (easingLoop !== null) {
        clearInterval(easingLoop);
      }

      e.stopPropagation();
    }
  }
  function touchMove(e) {
    if (!inLocalTouch && i.settings.swipePropagation) {
      touchStart(e);
    }
    if (!inGlobalTouch && inLocalTouch && shouldHandle(e)) {
      var touch = getTouch(e);

      var currentOffset = {pageX: touch.pageX, pageY: touch.pageY};

      var differenceX = currentOffset.pageX - startOffset.pageX;
      var differenceY = currentOffset.pageY - startOffset.pageY;

      applyTouchMove(differenceX, differenceY);
      startOffset = currentOffset;

      var currentTime = (new Date()).getTime();

      var timeGap = currentTime - startTime;
      if (timeGap > 0) {
        speed.x = differenceX / timeGap;
        speed.y = differenceY / timeGap;
        startTime = currentTime;
      }

      if (shouldPreventDefault(differenceX, differenceY)) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }
  function touchEnd() {
    if (!inGlobalTouch && inLocalTouch) {
      inLocalTouch = false;

      if (i.settings.swipeEasing) {
        clearInterval(easingLoop);
        easingLoop = setInterval(function () {
          if (!instances.get(element)) {
            clearInterval(easingLoop);
            return;
          }

          if (!speed.x && !speed.y) {
            clearInterval(easingLoop);
            return;
          }

          if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
            clearInterval(easingLoop);
            return;
          }

          applyTouchMove(speed.x * 30, speed.y * 30);

          speed.x *= 0.8;
          speed.y *= 0.8;
        }, 10);
      }
    }
  }

  if (supportsTouch) {
    i.event.bind(window, 'touchstart', globalTouchStart);
    i.event.bind(window, 'touchend', globalTouchEnd);
    i.event.bind(element, 'touchstart', touchStart);
    i.event.bind(element, 'touchmove', touchMove);
    i.event.bind(element, 'touchend', touchEnd);
  } else if (supportsIePointer) {
    if (window.PointerEvent) {
      i.event.bind(window, 'pointerdown', globalTouchStart);
      i.event.bind(window, 'pointerup', globalTouchEnd);
      i.event.bind(element, 'pointerdown', touchStart);
      i.event.bind(element, 'pointermove', touchMove);
      i.event.bind(element, 'pointerup', touchEnd);
    } else if (window.MSPointerEvent) {
      i.event.bind(window, 'MSPointerDown', globalTouchStart);
      i.event.bind(window, 'MSPointerUp', globalTouchEnd);
      i.event.bind(element, 'MSPointerDown', touchStart);
      i.event.bind(element, 'MSPointerMove', touchMove);
      i.event.bind(element, 'MSPointerUp', touchEnd);
    }
  }
}

module.exports = function (element) {
  if (!_.env.supportsTouch && !_.env.supportsIePointer) {
    return;
  }

  var i = instances.get(element);
  bindTouchHandler(element, i, _.env.supportsTouch, _.env.supportsIePointer);
};


/***/ }),

/***/ "./node_modules/perfect-scrollbar/src/js/plugin/initialize.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var instances = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/instances.js");
var updateGeometry = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/update-geometry.js");

// Handlers
var handlers = {
  'click-rail': __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/handler/click-rail.js"),
  'drag-scrollbar': __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/handler/drag-scrollbar.js"),
  'keyboard': __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/handler/keyboard.js"),
  'wheel': __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/handler/mouse-wheel.js"),
  'touch': __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/handler/touch.js"),
  'selection': __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/handler/selection.js")
};
var nativeScrollHandler = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/handler/native-scroll.js");

module.exports = function (element, userSettings) {
  element.classList.add('ps');

  // Create a plugin instance.
  var i = instances.add(
    element,
    typeof userSettings === 'object' ? userSettings : {}
  );

  element.classList.add('ps--theme_' + i.settings.theme);

  i.settings.handlers.forEach(function (handlerName) {
    handlers[handlerName](element);
  });

  nativeScrollHandler(element);

  updateGeometry(element);
};


/***/ }),

/***/ "./node_modules/perfect-scrollbar/src/js/plugin/instances.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__("./node_modules/perfect-scrollbar/src/js/lib/helper.js");
var defaultSettings = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/default-setting.js");
var dom = __webpack_require__("./node_modules/perfect-scrollbar/src/js/lib/dom.js");
var EventManager = __webpack_require__("./node_modules/perfect-scrollbar/src/js/lib/event-manager.js");
var guid = __webpack_require__("./node_modules/perfect-scrollbar/src/js/lib/guid.js");

var instances = {};

function Instance(element, userSettings) {
  var i = this;

  i.settings = defaultSettings();
  for (var key in userSettings) {
    i.settings[key] = userSettings[key];
  }

  i.containerWidth = null;
  i.containerHeight = null;
  i.contentWidth = null;
  i.contentHeight = null;

  i.isRtl = dom.css(element, 'direction') === "rtl";
  i.isNegativeScroll = (function () {
    var originalScrollLeft = element.scrollLeft;
    var result = null;
    element.scrollLeft = -1;
    result = element.scrollLeft < 0;
    element.scrollLeft = originalScrollLeft;
    return result;
  })();
  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;
  i.event = new EventManager();
  i.ownerDocument = element.ownerDocument || document;

  function focus() {
    element.classList.add('ps--focus');
  }

  function blur() {
    element.classList.remove('ps--focus');
  }

  i.scrollbarXRail = dom.appendTo(dom.create('div', 'ps__scrollbar-x-rail'), element);
  i.scrollbarX = dom.appendTo(dom.create('div', 'ps__scrollbar-x'), i.scrollbarXRail);
  i.scrollbarX.setAttribute('tabindex', 0);
  i.event.bind(i.scrollbarX, 'focus', focus);
  i.event.bind(i.scrollbarX, 'blur', blur);
  i.scrollbarXActive = null;
  i.scrollbarXWidth = null;
  i.scrollbarXLeft = null;
  i.scrollbarXBottom = _.toInt(dom.css(i.scrollbarXRail, 'bottom'));
  i.isScrollbarXUsingBottom = i.scrollbarXBottom === i.scrollbarXBottom; // !isNaN
  i.scrollbarXTop = i.isScrollbarXUsingBottom ? null : _.toInt(dom.css(i.scrollbarXRail, 'top'));
  i.railBorderXWidth = _.toInt(dom.css(i.scrollbarXRail, 'borderLeftWidth')) + _.toInt(dom.css(i.scrollbarXRail, 'borderRightWidth'));
  // Set rail to display:block to calculate margins
  dom.css(i.scrollbarXRail, 'display', 'block');
  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
  dom.css(i.scrollbarXRail, 'display', '');
  i.railXWidth = null;
  i.railXRatio = null;

  i.scrollbarYRail = dom.appendTo(dom.create('div', 'ps__scrollbar-y-rail'), element);
  i.scrollbarY = dom.appendTo(dom.create('div', 'ps__scrollbar-y'), i.scrollbarYRail);
  i.scrollbarY.setAttribute('tabindex', 0);
  i.event.bind(i.scrollbarY, 'focus', focus);
  i.event.bind(i.scrollbarY, 'blur', blur);
  i.scrollbarYActive = null;
  i.scrollbarYHeight = null;
  i.scrollbarYTop = null;
  i.scrollbarYRight = _.toInt(dom.css(i.scrollbarYRail, 'right'));
  i.isScrollbarYUsingRight = i.scrollbarYRight === i.scrollbarYRight; // !isNaN
  i.scrollbarYLeft = i.isScrollbarYUsingRight ? null : _.toInt(dom.css(i.scrollbarYRail, 'left'));
  i.scrollbarYOuterWidth = i.isRtl ? _.outerWidth(i.scrollbarY) : null;
  i.railBorderYWidth = _.toInt(dom.css(i.scrollbarYRail, 'borderTopWidth')) + _.toInt(dom.css(i.scrollbarYRail, 'borderBottomWidth'));
  dom.css(i.scrollbarYRail, 'display', 'block');
  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));
  dom.css(i.scrollbarYRail, 'display', '');
  i.railYHeight = null;
  i.railYRatio = null;
}

function getId(element) {
  return element.getAttribute('data-ps-id');
}

function setId(element, id) {
  element.setAttribute('data-ps-id', id);
}

function removeId(element) {
  element.removeAttribute('data-ps-id');
}

exports.add = function (element, userSettings) {
  var newId = guid();
  setId(element, newId);
  instances[newId] = new Instance(element, userSettings);
  return instances[newId];
};

exports.remove = function (element) {
  delete instances[getId(element)];
  removeId(element);
};

exports.get = function (element) {
  return instances[getId(element)];
};


/***/ }),

/***/ "./node_modules/perfect-scrollbar/src/js/plugin/update-geometry.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__("./node_modules/perfect-scrollbar/src/js/lib/helper.js");
var dom = __webpack_require__("./node_modules/perfect-scrollbar/src/js/lib/dom.js");
var instances = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/instances.js");
var updateScroll = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/update-scroll.js");

function getThumbSize(i, thumbSize) {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
  }
  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
  }
  return thumbSize;
}

function updateCss(element, i) {
  var xRailOffset = {width: i.railXWidth};
  if (i.isRtl) {
    xRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth - i.contentWidth;
  } else {
    xRailOffset.left = element.scrollLeft;
  }
  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - element.scrollTop;
  } else {
    xRailOffset.top = i.scrollbarXTop + element.scrollTop;
  }
  dom.css(i.scrollbarXRail, xRailOffset);

  var yRailOffset = {top: element.scrollTop, height: i.railYHeight};
  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right = i.contentWidth - (i.negativeScrollAdjustment + element.scrollLeft) - i.scrollbarYRight - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth * 2 - i.contentWidth - i.scrollbarYLeft - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    }
  }
  dom.css(i.scrollbarYRail, yRailOffset);

  dom.css(i.scrollbarX, {left: i.scrollbarXLeft, width: i.scrollbarXWidth - i.railBorderXWidth});
  dom.css(i.scrollbarY, {top: i.scrollbarYTop, height: i.scrollbarYHeight - i.railBorderYWidth});
}

module.exports = function (element) {
  var i = instances.get(element);

  i.containerWidth = element.clientWidth;
  i.containerHeight = element.clientHeight;
  i.contentWidth = element.scrollWidth;
  i.contentHeight = element.scrollHeight;

  var existingRails;
  if (!element.contains(i.scrollbarXRail)) {
    existingRails = dom.queryChildren(element, '.ps__scrollbar-x-rail');
    if (existingRails.length > 0) {
      existingRails.forEach(function (rail) {
        dom.remove(rail);
      });
    }
    dom.appendTo(i.scrollbarXRail, element);
  }
  if (!element.contains(i.scrollbarYRail)) {
    existingRails = dom.queryChildren(element, '.ps__scrollbar-y-rail');
    if (existingRails.length > 0) {
      existingRails.forEach(function (rail) {
        dom.remove(rail);
      });
    }
    dom.appendTo(i.scrollbarYRail, element);
  }

  if (!i.settings.suppressScrollX && i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth) {
    i.scrollbarXActive = true;
    i.railXWidth = i.containerWidth - i.railXMarginWidth;
    i.railXRatio = i.containerWidth / i.railXWidth;
    i.scrollbarXWidth = getThumbSize(i, _.toInt(i.railXWidth * i.containerWidth / i.contentWidth));
    i.scrollbarXLeft = _.toInt((i.negativeScrollAdjustment + element.scrollLeft) * (i.railXWidth - i.scrollbarXWidth) / (i.contentWidth - i.containerWidth));
  } else {
    i.scrollbarXActive = false;
  }

  if (!i.settings.suppressScrollY && i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight) {
    i.scrollbarYActive = true;
    i.railYHeight = i.containerHeight - i.railYMarginHeight;
    i.railYRatio = i.containerHeight / i.railYHeight;
    i.scrollbarYHeight = getThumbSize(i, _.toInt(i.railYHeight * i.containerHeight / i.contentHeight));
    i.scrollbarYTop = _.toInt(element.scrollTop * (i.railYHeight - i.scrollbarYHeight) / (i.contentHeight - i.containerHeight));
  } else {
    i.scrollbarYActive = false;
  }

  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
  }
  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
  }

  updateCss(element, i);

  if (i.scrollbarXActive) {
    element.classList.add('ps--active-x');
  } else {
    element.classList.remove('ps--active-x');
    i.scrollbarXWidth = 0;
    i.scrollbarXLeft = 0;
    updateScroll(element, 'left', 0);
  }
  if (i.scrollbarYActive) {
    element.classList.add('ps--active-y');
  } else {
    element.classList.remove('ps--active-y');
    i.scrollbarYHeight = 0;
    i.scrollbarYTop = 0;
    updateScroll(element, 'top', 0);
  }
};


/***/ }),

/***/ "./node_modules/perfect-scrollbar/src/js/plugin/update-scroll.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var instances = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/instances.js");

var createDOMEvent = function (name) {
  var event = document.createEvent("Event");
  event.initEvent(name, true, true);
  return event;
};

module.exports = function (element, axis, value) {
  if (typeof element === 'undefined') {
    throw 'You must provide an element to the update-scroll function';
  }

  if (typeof axis === 'undefined') {
    throw 'You must provide an axis to the update-scroll function';
  }

  if (typeof value === 'undefined') {
    throw 'You must provide a value to the update-scroll function';
  }

  if (axis === 'top' && value <= 0) {
    element.scrollTop = value = 0; // don't allow negative scroll
    element.dispatchEvent(createDOMEvent('ps-y-reach-start'));
  }

  if (axis === 'left' && value <= 0) {
    element.scrollLeft = value = 0; // don't allow negative scroll
    element.dispatchEvent(createDOMEvent('ps-x-reach-start'));
  }

  var i = instances.get(element);

  if (axis === 'top' && value >= i.contentHeight - i.containerHeight) {
    // don't allow scroll past container
    value = i.contentHeight - i.containerHeight;
    if (value - element.scrollTop <= 2) {
      // mitigates rounding errors on non-subpixel scroll values
      value = element.scrollTop;
    } else {
      element.scrollTop = value;
    }
    element.dispatchEvent(createDOMEvent('ps-y-reach-end'));
  }

  if (axis === 'left' && value >= i.contentWidth - i.containerWidth) {
    // don't allow scroll past container
    value = i.contentWidth - i.containerWidth;
    if (value - element.scrollLeft <= 2) {
      // mitigates rounding errors on non-subpixel scroll values
      value = element.scrollLeft;
    } else {
      element.scrollLeft = value;
    }
    element.dispatchEvent(createDOMEvent('ps-x-reach-end'));
  }

  if (i.lastTop === undefined) {
    i.lastTop = element.scrollTop;
  }

  if (i.lastLeft === undefined) {
    i.lastLeft = element.scrollLeft;
  }

  if (axis === 'top' && value < i.lastTop) {
    element.dispatchEvent(createDOMEvent('ps-scroll-up'));
  }

  if (axis === 'top' && value > i.lastTop) {
    element.dispatchEvent(createDOMEvent('ps-scroll-down'));
  }

  if (axis === 'left' && value < i.lastLeft) {
    element.dispatchEvent(createDOMEvent('ps-scroll-left'));
  }

  if (axis === 'left' && value > i.lastLeft) {
    element.dispatchEvent(createDOMEvent('ps-scroll-right'));
  }

  if (axis === 'top' && value !== i.lastTop) {
    element.scrollTop = i.lastTop = value;
    element.dispatchEvent(createDOMEvent('ps-scroll-y'));
  }

  if (axis === 'left' && value !== i.lastLeft) {
    element.scrollLeft = i.lastLeft = value;
    element.dispatchEvent(createDOMEvent('ps-scroll-x'));
  }

};


/***/ }),

/***/ "./node_modules/perfect-scrollbar/src/js/plugin/update.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__("./node_modules/perfect-scrollbar/src/js/lib/helper.js");
var dom = __webpack_require__("./node_modules/perfect-scrollbar/src/js/lib/dom.js");
var instances = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/instances.js");
var updateGeometry = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/update-geometry.js");
var updateScroll = __webpack_require__("./node_modules/perfect-scrollbar/src/js/plugin/update-scroll.js");

module.exports = function (element) {
  var i = instances.get(element);

  if (!i) {
    return;
  }

  // Recalcuate negative scrollLeft adjustment
  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;

  // Recalculate rail margins
  dom.css(i.scrollbarXRail, 'display', 'block');
  dom.css(i.scrollbarYRail, 'display', 'block');
  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));

  // Hide scrollbars not to affect scrollWidth and scrollHeight
  dom.css(i.scrollbarXRail, 'display', 'none');
  dom.css(i.scrollbarYRail, 'display', 'none');

  updateGeometry(element);

  // Update top/left scroll to trigger events
  updateScroll(element, 'top', element.scrollTop);
  updateScroll(element, 'left', element.scrollLeft);

  dom.css(i.scrollbarXRail, 'display', '');
  dom.css(i.scrollbarYRail, 'display', '');
};


/***/ }),

/***/ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }

    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;

        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;

                return true;
            }

            return false;
        });

        return result;
    }

    return (function () {
        function anonymous() {
            this.__entries__ = [];
        }

        var prototypeAccessors = { size: { configurable: true } };

        /**
         * @returns {boolean}
         */
        prototypeAccessors.size.get = function () {
            return this.__entries__.length;
        };

        /**
         * @param {*} key
         * @returns {*}
         */
        anonymous.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];

            return entry && entry[1];
        };

        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        anonymous.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);

            if (~index) {
                this.__entries__[index][1] = value;
            } else {
                this.__entries__.push([key, value]);
            }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);

            if (~index) {
                entries.splice(index, 1);
            }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };

        /**
         * @returns {void}
         */
        anonymous.prototype.clear = function () {
            this.__entries__.splice(0);
        };

        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        anonymous.prototype.forEach = function (callback, ctx) {
            var this$1 = this;
            if ( ctx === void 0 ) ctx = null;

            for (var i = 0, list = this$1.__entries__; i < list.length; i += 1) {
                var entry = list[i];

                callback.call(ctx, entry[1], entry[0]);
            }
        };

        Object.defineProperties( anonymous.prototype, prototypeAccessors );

        return anonymous;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }

    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }

    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }

    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }

    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;

/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
var throttle = function (callback, delay) {
    var leadingCall = false,
        trailingCall = false,
        lastCallTime = 0;

    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;

            callback();
        }

        if (trailingCall) {
            proxy();
        }
    }

    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }

    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();

        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }

            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        } else {
            leadingCall = true;
            trailingCall = false;

            setTimeout(timeoutCallback, delay);
        }

        lastCallTime = timeStamp;
    }

    return proxy;
};

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;

// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];

// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';

/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = function() {
    this.connected_ = false;
    this.mutationEventsAdded_ = false;
    this.mutationsObserver_ = null;
    this.observers_ = [];

    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
};

/**
 * Adds observer to observers list.
 *
 * @param {ResizeObserverSPI} observer - Observer to be added.
 * @returns {void}
 */


/**
 * Holds reference to the controller's instance.
 *
 * @private {ResizeObserverController}
 */


/**
 * Keeps reference to the instance of MutationObserver.
 *
 * @private {MutationObserver}
 */

/**
 * Indicates whether DOM listeners have been added.
 *
 * @private {boolean}
 */
ResizeObserverController.prototype.addObserver = function (observer) {
    if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
    }

    // Add listeners if they haven't been added yet.
    if (!this.connected_) {
        this.connect_();
    }
};

/**
 * Removes observer from observers list.
 *
 * @param {ResizeObserverSPI} observer - Observer to be removed.
 * @returns {void}
 */
ResizeObserverController.prototype.removeObserver = function (observer) {
    var observers = this.observers_;
    var index = observers.indexOf(observer);

    // Remove observer if it's present in registry.
    if (~index) {
        observers.splice(index, 1);
    }

    // Remove listeners if controller has no connected observers.
    if (!observers.length && this.connected_) {
        this.disconnect_();
    }
};

/**
 * Invokes the update of observers. It will continue running updates insofar
 * it detects changes.
 *
 * @returns {void}
 */
ResizeObserverController.prototype.refresh = function () {
    var changesDetected = this.updateObservers_();

    // Continue running updates if changes have been detected as there might
    // be future ones caused by CSS transitions.
    if (changesDetected) {
        this.refresh();
    }
};

/**
 * Updates every observer from observers list and notifies them of queued
 * entries.
 *
 * @private
 * @returns {boolean} Returns "true" if any observer has detected changes in
 *  dimensions of it's elements.
 */
ResizeObserverController.prototype.updateObservers_ = function () {
    // Collect observers that have active observations.
    var activeObservers = this.observers_.filter(function (observer) {
        return observer.gatherActive(), observer.hasActive();
    });

    // Deliver notifications in a separate cycle in order to avoid any
    // collisions between observers, e.g. when multiple instances of
    // ResizeObserver are tracking the same element and the callback of one
    // of them changes content dimensions of the observed target. Sometimes
    // this may result in notifications being blocked for the rest of observers.
    activeObservers.forEach(function (observer) { return observer.broadcastActive(); });

    return activeObservers.length > 0;
};

/**
 * Initializes DOM listeners.
 *
 * @private
 * @returns {void}
 */
ResizeObserverController.prototype.connect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already added.
    if (!isBrowser || this.connected_) {
        return;
    }

    // Subscription to the "Transitionend" event is used as a workaround for
    // delayed transitions. This way it's possible to capture at least the
    // final state of an element.
    document.addEventListener('transitionend', this.onTransitionEnd_);

    window.addEventListener('resize', this.refresh);

    if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);

        this.mutationsObserver_.observe(document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        });
    } else {
        document.addEventListener('DOMSubtreeModified', this.refresh);

        this.mutationEventsAdded_ = true;
    }

    this.connected_ = true;
};

/**
 * Removes DOM listeners.
 *
 * @private
 * @returns {void}
 */
ResizeObserverController.prototype.disconnect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already removed.
    if (!isBrowser || !this.connected_) {
        return;
    }

    document.removeEventListener('transitionend', this.onTransitionEnd_);
    window.removeEventListener('resize', this.refresh);

    if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
    }

    if (this.mutationEventsAdded_) {
        document.removeEventListener('DOMSubtreeModified', this.refresh);
    }

    this.mutationsObserver_ = null;
    this.mutationEventsAdded_ = false;
    this.connected_ = false;
};

/**
 * "Transitionend" event handler.
 *
 * @private
 * @param {TransitionEvent} event
 * @returns {void}
 */
ResizeObserverController.prototype.onTransitionEnd_ = function (ref) {
        var propertyName = ref.propertyName; if ( propertyName === void 0 ) propertyName = '';

    // Detect whether transition may affect dimensions of an element.
    var isReflowProperty = transitionKeys.some(function (key) {
        return !!~propertyName.indexOf(key);
    });

    if (isReflowProperty) {
        this.refresh();
    }
};

/**
 * Returns instance of the ResizeObserverController.
 *
 * @returns {ResizeObserverController}
 */
ResizeObserverController.getInstance = function () {
    if (!this.instance_) {
        this.instance_ = new ResizeObserverController();
    }

    return this.instance_;
};

ResizeObserverController.instance_ = null;

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var i = 0, list = Object.keys(props); i < list.length; i += 1) {
        var key = list[i];

        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }

    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;

    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);

/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}

/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [], len = arguments.length - 1;
    while ( len-- > 0 ) positions[ len ] = arguments[ len + 1 ];

    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];

        return size + toFloat(value);
    }, 0);
}

/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};

    for (var i = 0, list = positions; i < list.length; i += 1) {
        var position = list[i];

        var value = styles['padding-' + position];

        paddings[position] = toFloat(value);
    }

    return paddings;
}

/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();

    return createRectInit(0, 0, bbox.width, bbox.height);
}

/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth;
    var clientHeight = target.clientHeight;

    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }

    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;

    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width),
        height = toFloat(styles.height);

    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }

        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }

    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;

        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }

        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }

    return createRectInit(paddings.left, paddings.top, width, height);
}

/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }

    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function'; };
})();

/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}

/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }

    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }

    return getHTMLElementContentRect(target);
}

/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(ref) {
    var x = ref.x;
    var y = ref.y;
    var width = ref.width;
    var height = ref.height;

    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);

    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });

    return rect;
}

/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = function(target) {
    this.broadcastWidth = 0;
    this.broadcastHeight = 0;
    this.contentRect_ = createRectInit(0, 0, 0, 0);

    this.target = target;
};

/**
 * Updates content rectangle and tells whether it's width or height properties
 * have changed since the last broadcast.
 *
 * @returns {boolean}
 */


/**
 * Reference to the last observed content rectangle.
 *
 * @private {DOMRectInit}
 */


/**
 * Broadcasted width of content rectangle.
 *
 * @type {number}
 */
ResizeObservation.prototype.isActive = function () {
    var rect = getContentRect(this.target);

    this.contentRect_ = rect;

    return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
};

/**
 * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
 * from the corresponding properties of the last observed content rectangle.
 *
 * @returns {DOMRectInit} Last observed content rectangle.
 */
ResizeObservation.prototype.broadcastRect = function () {
    var rect = this.contentRect_;

    this.broadcastWidth = rect.width;
    this.broadcastHeight = rect.height;

    return rect;
};

var ResizeObserverEntry = function(target, rectInit) {
    var contentRect = createReadOnlyRect(rectInit);

    // According to the specification following properties are not writable
    // and are also not enumerable in the native implementation.
    //
    // Property accessors are not being used as they'd require to define a
    // private WeakMap storage which may cause memory leaks in browsers that
    // don't support this type of collections.
    defineConfigurable(this, { target: target, contentRect: contentRect });
};

var ResizeObserverSPI = function(callback, controller, callbackCtx) {
    this.activeObservations_ = [];
    this.observations_ = new MapShim();

    if (typeof callback !== 'function') {
        throw new TypeError('The callback provided as parameter 1 is not a function.');
    }

    this.callback_ = callback;
    this.controller_ = controller;
    this.callbackCtx_ = callbackCtx;
};

/**
 * Starts observing provided element.
 *
 * @param {Element} target - Element to be observed.
 * @returns {void}
 */


/**
 * Registry of the ResizeObservation instances.
 *
 * @private {Map<Element, ResizeObservation>}
 */


/**
 * Public ResizeObserver instance which will be passed to the callback
 * function and used as a value of it's "this" binding.
 *
 * @private {ResizeObserver}
 */

/**
 * Collection of resize observations that have detected changes in dimensions
 * of elements.
 *
 * @private {Array<ResizeObservation>}
 */
ResizeObserverSPI.prototype.observe = function (target) {
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_;

    // Do nothing if element is already being observed.
    if (observations.has(target)) {
        return;
    }

    observations.set(target, new ResizeObservation(target));

    this.controller_.addObserver(this);

    // Force the update of observations.
    this.controller_.refresh();
};

/**
 * Stops observing provided element.
 *
 * @param {Element} target - Element to stop observing.
 * @returns {void}
 */
ResizeObserverSPI.prototype.unobserve = function (target) {
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_;

    // Do nothing if element is not being observed.
    if (!observations.has(target)) {
        return;
    }

    observations.delete(target);

    if (!observations.size) {
        this.controller_.removeObserver(this);
    }
};

/**
 * Stops observing all elements.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.disconnect = function () {
    this.clearActive();
    this.observations_.clear();
    this.controller_.removeObserver(this);
};

/**
 * Collects observation instances the associated element of which has changed
 * it's content rectangle.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.gatherActive = function () {
        var this$1 = this;

    this.clearActive();

    this.observations_.forEach(function (observation) {
        if (observation.isActive()) {
            this$1.activeObservations_.push(observation);
        }
    });
};

/**
 * Invokes initial callback function with a list of ResizeObserverEntry
 * instances collected from active resize observations.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.broadcastActive = function () {
    // Do nothing if observer doesn't have active observations.
    if (!this.hasActive()) {
        return;
    }

    var ctx = this.callbackCtx_;

    // Create ResizeObserverEntry instance for every active observation.
    var entries = this.activeObservations_.map(function (observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
    });

    this.callback_.call(ctx, entries, ctx);
    this.clearActive();
};

/**
 * Clears the collection of active observations.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.clearActive = function () {
    this.activeObservations_.splice(0);
};

/**
 * Tells whether observer has active observations.
 *
 * @returns {boolean}
 */
ResizeObserverSPI.prototype.hasActive = function () {
    return this.activeObservations_.length > 0;
};

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();

/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = function(callback) {
    if (!(this instanceof ResizeObserver)) {
        throw new TypeError('Cannot call a class as a function.');
    }
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    var controller = ResizeObserverController.getInstance();
    var observer = new ResizeObserverSPI(callback, controller, this);

    observers.set(this, observer);
};

// Expose public methods of ResizeObserver.
['observe', 'unobserve', 'disconnect'].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        return (ref = observers.get(this))[method].apply(ref, arguments);
        var ref;
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }

    return ResizeObserver;
})();

/* harmony default export */ __webpack_exports__["default"] = (index);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/app/layout/layout.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"app_wrapper\">\n\n  <!-- top navbar-->\n  <app-header id=\"app_topnavbar-wrapper\"></app-header>\n      <!-- App Sidebar Left-->\n      <app-sidebar id=\"app_sidebar-left\"></app-sidebar>\n      <!-- Main section-->\n      <section id=\"content_outer_wrapper\">\n        <router-outlet></router-outlet>\n        <!-- Page content-->\n      </section>\n      <!-- App Sidebar Right-->\n      \t<app-offsidebar id=\"app_sidebar-right\"></app-offsidebar>\n\n</div>\n<appBackdrop></appBackdrop>\n"

/***/ }),

/***/ "./src/app/layout/layout.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/layout/layout.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_state__ = __webpack_require__("./src/app/app.state.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_config_config_service__ = __webpack_require__("./src/app/shared/services/config/config.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LayoutComponent = /** @class */ (function () {
    function LayoutComponent(config, _elementRef, _state) {
        this.config = config;
        this._elementRef = _elementRef;
        this._state = _state;
    }
    LayoutComponent.prototype.ngOnInit = function () {
    };
    LayoutComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-layout',
            template: __webpack_require__("./src/app/layout/layout.component.html"),
            styles: [__webpack_require__("./src/app/layout/layout.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].Emulated,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_config_config_service__["a" /* ConfigService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_config_config_service__["a" /* ConfigService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__app_state__["a" /* GlobalState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__app_state__["a" /* GlobalState */]) === "function" && _c || Object])
    ], LayoutComponent);
    return LayoutComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=layout.component.js.map

/***/ }),

/***/ "./src/app/layout/layout.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutModule", function() { return LayoutModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout_routes__ = __webpack_require__("./src/app/layout/layout.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__layout_component__ = __webpack_require__("./src/app/layout/layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__left_sidebar_left_sidebar_component__ = __webpack_require__("./src/app/layout/left-sidebar/left-sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__top_navbar_top_navbar_component__ = __webpack_require__("./src/app/layout/top-navbar/top-navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__top_navbar_search_search_component__ = __webpack_require__("./src/app/layout/top-navbar/search/search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__right_sidebar_right_sidebar_component__ = __webpack_require__("./src/app/layout/right-sidebar/right-sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_shared_module__ = __webpack_require__("./src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_directives_scrollbar_directive__ = __webpack_require__("./src/app/shared/directives/scrollbar.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_directives_nav_dropdown_directive__ = __webpack_require__("./src/app/shared/directives/nav-dropdown.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ngx_perfect_scrollbar__ = __webpack_require__("./node_modules/ngx-perfect-scrollbar/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ngx_perfect_scrollbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_ngx_perfect_scrollbar__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__layout_component__["a" /* LayoutComponent */],
                __WEBPACK_IMPORTED_MODULE_5__left_sidebar_left_sidebar_component__["a" /* LeftSidebarComponent */],
                __WEBPACK_IMPORTED_MODULE_6__top_navbar_top_navbar_component__["a" /* TopNavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_7__top_navbar_search_search_component__["a" /* SearchComponent */],
                __WEBPACK_IMPORTED_MODULE_8__right_sidebar_right_sidebar_component__["a" /* RightSidebarComponent */],
                __WEBPACK_IMPORTED_MODULE_10__shared_directives_scrollbar_directive__["a" /* ScrollbarDirective */],
                __WEBPACK_IMPORTED_MODULE_11__shared_directives_nav_dropdown_directive__["a" /* NavDropDownDirectives */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__layout_routes__["a" /* LayoutRoutes */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_9__shared_shared_module__["a" /* SharedModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_12_ngx_perfect_scrollbar__["PerfectScrollbarModule"].forRoot(PERFECT_SCROLLBAR_CONFIG)
            ]
        })
    ], LayoutModule);
    return LayoutModule;
}());

//# sourceMappingURL=layout.module.js.map

/***/ }),

/***/ "./src/app/layout/layout.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutRoutes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layout_component__ = __webpack_require__("./src/app/layout/layout.component.ts");


var LAYOUT_ROUTES = [
    {
        path: "",
        component: __WEBPACK_IMPORTED_MODULE_1__layout_component__["a" /* LayoutComponent */],
        children: [
            { path: "", redirectTo: "dashboards", pathMatch: "full" },
            //---------------------------------------------------------->
            //Dashboards
            //---------------------------------------------------------->
            {
                path: "dashboards",
                loadChildren: "../pages/dashboards/dashboards.module#DashboardsModule"
            },
            //---------------------------------------------------------->
            //Page Layouts
            //---------------------------------------------------------->
            {
                path: "page-layouts/full-width-v1",
                loadChildren: "../pages/page-layouts/full-width-v1/full-width-v1.module#FullWidthV1Module"
            },
            {
                path: "page-layouts/full-width-v2",
                loadChildren: "../pages/page-layouts/full-width-v2/full-width-v2.module#FullWidthV2Module"
            },
            {
                path: "page-layouts/full-width-v3",
                loadChildren: "../pages/page-layouts/full-width-v3/full-width-v3.module#FullWidthV3Module"
            },
            {
                path: "page-layouts/boxed-layout-v1",
                loadChildren: "../pages/page-layouts/boxed-layout-v1/boxed-layout-v1.module#BoxedV1Module"
            },
            {
                path: "page-layouts/boxed-layout-v2",
                loadChildren: "../pages/page-layouts/boxed-layout-v2/boxed-layout-v2.module#BoxedV2Module"
            },
            {
                path: "page-layouts/boxed-layout-v3",
                loadChildren: "../pages/page-layouts/boxed-layout-v3/boxed-layout-v3.module#BoxedV3Module"
            },
            {
                path: "page-layouts/detached-toolbar-left",
                loadChildren: "../pages/page-layouts/detached-toolbar-left/detached-toolbar-left.module#DetachedToolbarLeftModule"
            },
            {
                path: "page-layouts/detached-toolbar-right",
                loadChildren: "../pages/page-layouts/detached-toolbar-right/detached-toolbar-right.module#DetachedToolbarRightModule"
            },
            {
                path: "page-layouts/left-side-nav-v1",
                loadChildren: "../pages/page-layouts/left-side-nav-v1/left-side-nav-v1.module#LeftSideNavV1Module"
            },
            {
                path: "page-layouts/left-side-nav-v2",
                loadChildren: "../pages/page-layouts/left-side-nav-v2/left-side-nav-v2.module#LeftSideNavV2Module"
            },
            {
                path: "page-layouts/right-side-nav-v1",
                loadChildren: "../pages/page-layouts/right-side-nav-v1/right-side-nav-v1.module#RightSideNavV1Module"
            },
            {
                path: "page-layouts/right-side-nav-v2",
                loadChildren: "../pages/page-layouts/right-side-nav-v2/right-side-nav-v2.module#RightSideNavV2Module"
            }
        ]
    },
    // 404 Page Not Found
    { path: "**", redirectTo: "dashboards" }
];
var LayoutRoutes = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forChild(LAYOUT_ROUTES);
//# sourceMappingURL=layout.routes.js.map

/***/ }),

/***/ "./src/app/layout/left-sidebar/left-sidebar.component.html":
/***/ (function(module, exports) {

module.exports = "\t<nav id=\"app_main-menu-wrapper\">\n\t\t<ul class=\"navbar-nav nav-logo\">\n\t\t\t<li class=\"nav-item logo-wrapper\">\n\t\t\t\t<a href=\"/dashboards\">\n\t\t\t\t\t<div class=\"logo\">\n\t\t\t\t\t\t<img src=\"assets/img/logo/logo-icon.png\" alt=\"Logo\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<h1 class=\"brand-text\">MaterialWrap</h1>\n\t\t\t\t</a>\n\t\t\t</li>\n\t\t\t<li class=\"nav-item\">\n\t\t\t\t<a md-ripple href=\"javascript:void(0)\" role=\"button\" (click)=\"toggleMenuSideabar()\" class=\"nav-link menu-trigger\">\n\t\t\t\t\t<i class=\"mdi mdi-backburger\"></i>\n\t\t\t\t</a>\n\t\t\t</li>\n\t\t</ul>\n\t\t<div class=\"sidebar-inner sidebar-push\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n\t\t\t<ul class=\"nav nav-pills flex-column\"  >\n\t\t\t\t<li class=\"sidebar-header\">NAVIGATION</li>\n\t\t\t\t<li routerLinkActive=\"active\"><a md-ripple href=\"javascript:void(0)\" class=\"\" [routerLink]=\"['/dashboards']\"><i class=\"zmdi zmdi-view-dashboard\"></i>Dashboards</a></li>\n\t\t\t\t<li routerLinkActive=\"active open\" appNavDropdown class=\"nav-dropdown\">\n\t\t\t\t\t<a md-ripple href=\"javascript:void(0)\" class=\"\" appNavDropdownToggle><i class=\"zmdi zmdi-view-quilt\"></i>Page Layouts</a>\n\t\t\t\t\t<ul class=\"nav-sub\">\n\t\t\t\t\t\t<li routerLinkActive=\"active open\" appNavDropdown class=\"nav-dropdown\">\n\t\t\t\t\t\t\t<a md-ripple href=\"javascript:void(0)\" class=\"\" appNavDropdownToggle>Full Width</a>\n\t\t\t\t\t\t\t<ul class=\"nav-sub\">\n\t\t\t\t\t\t\t\t<li routerLinkActive=\"active\"><a href=\"javascript:void(0)\" [routerLink]=\"['/page-layouts/full-width-v1']\">Full Width v1</a></li>\n\t\t\t\t\t\t\t\t<li routerLinkActive=\"active\"><a href=\"javascript:void(0)\" [routerLink]=\"['/page-layouts/full-width-v2']\">Full Width v2</a></li>\n\t\t\t\t\t\t\t\t<li routerLinkActive=\"active\"><a href=\"javascript:void(0)\" [routerLink]=\"['/page-layouts/full-width-v3']\">Full Width v3</a></li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t\t<ul class=\"nav-sub\">\n\t\t\t\t\t\t<li routerLinkActive=\"active open\" appNavDropdown class=\"nav-dropdown\">\n\t\t\t\t\t\t\t<a md-ripple href=\"javascript:void(0)\" class=\"\" appNavDropdownToggle>Boxed Layouts</a>\n\t\t\t\t\t\t\t<ul class=\"nav-sub\">\n\t\t\t\t\t\t\t\t<li routerLinkActive=\"active\"><a href=\"javascript:void(0)\" [routerLink]=\"['/page-layouts/boxed-layout-v1']\">Boxed Layout v1</a></li>\n\t\t\t\t\t\t\t\t<li routerLinkActive=\"active\"><a href=\"javascript:void(0)\" [routerLink]=\"['/page-layouts/boxed-layout-v2']\">Boxed Layout v2</a></li>\n\t\t\t\t\t\t\t\t<li routerLinkActive=\"active\"><a href=\"javascript:void(0)\" [routerLink]=\"['/page-layouts/boxed-layout-v3']\">Boxed Layout v3</a></li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t\t<ul class=\"nav-sub\">\n\t\t\t\t\t\t<li routerLinkActive=\"active open\" appNavDropdown class=\"nav-dropdown\">\n\t\t\t\t\t\t\t<a md-ripple href=\"javascript:void(0)\" class=\"\" appNavDropdownToggle>Detached Toolbar</a>\n\t\t\t\t\t\t\t<ul class=\"nav-sub\">\n\t\t\t\t\t\t\t\t<li routerLinkActive=\"active\"><a href=\"javascript:void(0)\" [routerLink]=\"['/page-layouts/detached-toolbar-left']\">Detached Toolbar Left</a></li>\n\t\t\t\t\t\t\t\t<li routerLinkActive=\"active\"><a href=\"javascript:void(0)\" [routerLink]=\"['/page-layouts/detached-toolbar-right']\">Detached Toolbar Right</a></li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t\t<ul class=\"nav-sub\">\n\t\t\t\t\t\t<li routerLinkActive=\"active open\" appNavDropdown class=\"nav-dropdown\">\n\t\t\t\t\t\t\t<a md-ripple href=\"javascript:void(0)\" class=\"\" appNavDropdownToggle>Left Side Nav</a>\n\t\t\t\t\t\t\t<ul class=\"nav-sub\">\n\t\t\t\t\t\t\t\t<li routerLinkActive=\"active\"><a href=\"javascript:void(0)\" [routerLink]=\"['/page-layouts/left-side-nav-v1']\">Left Side Nav v1</a></li>\n\t\t\t\t\t\t\t\t<li routerLinkActive=\"active\"><a href=\"javascript:void(0)\" [routerLink]=\"['/page-layouts/left-side-nav-v2']\">Left Side Nav v2</a></li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t\t<ul class=\"nav-sub\">\n\t\t\t\t\t\t<li routerLinkActive=\"active open\" appNavDropdown class=\"nav-dropdown\">\n\t\t\t\t\t\t\t<a md-ripple href=\"javascript:void(0)\" class=\"\" appNavDropdownToggle>Right Side Nav</a>\n\t\t\t\t\t\t\t<ul class=\"nav-sub\">\n\t\t\t\t\t\t\t\t<li routerLinkActive=\"active\"><a href=\"javascript:void(0)\" [routerLink]=\"['/page-layouts/right-side-nav-v1']\">Right Side Nav v1</a></li>\n\t\t\t\t\t\t\t\t<li routerLinkActive=\"active\"><a href=\"javascript:void(0)\" [routerLink]=\"['/page-layouts/right-side-nav-v2']\">Right Side Nav v2</a></li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</div>\n\t</nav>\n"

/***/ }),

/***/ "./src/app/layout/left-sidebar/left-sidebar.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/layout/left-sidebar/left-sidebar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeftSidebarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_state__ = __webpack_require__("./src/app/app.state.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_config_config_service__ = __webpack_require__("./src/app/shared/services/config/config.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LeftSidebarComponent = /** @class */ (function () {
    function LeftSidebarComponent(config, _elementRef, _state) {
        var _this = this;
        this.config = config;
        this._elementRef = _elementRef;
        this._state = _state;
        this.scrollbarOptions = {
            axis: 'y',
            theme: 'minimal',
            scrollInertia: 0,
            mouseWheel: { preventDefault: true }
        };
        this._state.subscribe('app.isCollapsed', function (isCollapsed) {
            _this.config.appLayout.isApp_SidebarLeftCollapsed = isCollapsed;
        });
    }
    LeftSidebarComponent.prototype.ngOnInit = function () { };
    LeftSidebarComponent.prototype.toggleMenuSideabar = function () {
        this.config.appLayout.isApp_SidebarLeftCollapsed = !this.config.appLayout.isApp_SidebarLeftCollapsed;
        this._state.notifyDataChanged('app.isCollapsed', this.config.appLayout.isApp_SidebarLeftCollapsed);
        return false;
    };
    LeftSidebarComponent.prototype.onWindowResize = function () { };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LeftSidebarComponent.prototype, "onWindowResize", null);
    LeftSidebarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__("./src/app/layout/left-sidebar/left-sidebar.component.html"),
            styles: [__webpack_require__("./src/app/layout/left-sidebar/left-sidebar.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_config_config_service__["a" /* ConfigService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_config_config_service__["a" /* ConfigService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__app_state__["a" /* GlobalState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__app_state__["a" /* GlobalState */]) === "function" && _c || Object])
    ], LeftSidebarComponent);
    return LeftSidebarComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=left-sidebar.component.js.map

/***/ }),

/***/ "./src/app/layout/right-sidebar/right-sidebar.component.html":
/***/ (function(module, exports) {

module.exports = "\n\t<div class=\"sidebar-inner sidebar-overlay\">\n\t\t<md-tab-group class=\"sidebar-right-tab-group\">\n\t\t\t<md-tab label=\"Tab 1\">\n\n\t\t\t</md-tab>\n\t\t\t<md-tab label=\"Tab 2\">\n\n\t\t\t</md-tab>\n\t\t</md-tab-group>\n\t</div>\n"

/***/ }),

/***/ "./src/app/layout/right-sidebar/right-sidebar.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/layout/right-sidebar/right-sidebar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RightSidebarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var RightSidebarComponent = /** @class */ (function () {
    function RightSidebarComponent() {
    }
    RightSidebarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "app-offsidebar",
            template: __webpack_require__("./src/app/layout/right-sidebar/right-sidebar.component.html"),
            styles: [__webpack_require__("./src/app/layout/right-sidebar/right-sidebar.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].Emulated
        })
    ], RightSidebarComponent);
    return RightSidebarComponent;
}());

//# sourceMappingURL=right-sidebar.component.js.map

/***/ }),

/***/ "./src/app/layout/top-navbar/search/search.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar-form\" id=\"navbar_form\" [class.open]=\"searchStatus\">\n\t<div class=\"form-group\">\n\t\t<input type=\"text\" placeholder=\"Search and press enter...\"  [(ngModel)]=\"searchValue\" class=\"form-control\" id=\"navbar_search\" >\n\t\t<i  (click)=\"closeSearch()\" class=\"zmdi zmdi-close close-search\"></i>\n\t</div>\n\t<button type=\"submit\" class=\"hidden btn btn-default\">Submit</button>\n</div>\n"

/***/ }),

/***/ "./src/app/layout/top-navbar/search/search.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* ANIMATION */\n/* SHADOWS */\n/*\n *\n *   MaterialWrap - Bootstrap + Material Design Admin Theme\n*/\n/*\n * CSS Transform - Scale and Rotate\n */\n/*\n * CSS Animations based on animate.css\n */\n.m-0 {\n  margin: 0 !important; }\n\n.m-5 {\n  margin: 5px !important; }\n\n.m-10 {\n  margin: 10px !important; }\n\n.m-15 {\n  margin: 15px !important; }\n\n.m-20 {\n  margin: 20px !important; }\n\n.m-30 {\n  margin: 30px !important; }\n\n.m-50 {\n  margin: 50px !important; }\n\n.m-l-0 {\n  margin-left: 0 !important; }\n\n.m-l-5 {\n  margin-left: 5px !important; }\n\n.m-l-10 {\n  margin-left: 10px !important; }\n\n.m-l-15 {\n  margin-left: 15px !important; }\n\n.m-l-20 {\n  margin-left: 20px !important; }\n\n.m-l-30 {\n  margin-left: 30px !important; }\n\n.m-l-40 {\n  margin-left: 40px !important; }\n\n.m-l-50 {\n  margin-left: 50px !important; }\n\n.m-l-n-1 {\n  margin-left: -1px !important; }\n\n.m-l-n-5 {\n  margin-left: -5px !important; }\n\n.m-l-n-10 {\n  margin-left: -10px !important; }\n\n.m-l-n-15 {\n  margin-left: -15px !important; }\n\n.m-l-n-20 {\n  margin-left: -20px !important; }\n\n.m-l-n-30 {\n  margin-left: -30px !important; }\n\n.m-l-n-40 {\n  margin-left: -40px !important; }\n\n.m-l-n-50 {\n  margin-left: -50px !important; }\n\n.m-t-0 {\n  margin-top: 0 !important; }\n\n.m-t-1 {\n  margin-top: 1px !important; }\n\n.m-t-5 {\n  margin-top: 5px !important; }\n\n.m-t-10 {\n  margin-top: 10px !important; }\n\n.m-t-15 {\n  margin-top: 15px !important; }\n\n.m-t-20 {\n  margin-top: 20px !important; }\n\n.m-t-30 {\n  margin-top: 30px !important; }\n\n.m-t-40 {\n  margin-top: 40px !important; }\n\n.m-t-50 {\n  margin-top: 50px !important; }\n\n.m-t-75 {\n  margin-top: 75px !important; }\n\n.m-t-100 {\n  margin-top: 100px !important; }\n\n.m-t-120 {\n  margin-top: 120px !important; }\n\n.m-t-140 {\n  margin-top: 140px !important; }\n\n.m-t-n-1 {\n  margin-top: -1px !important; }\n\n.m-t-n-5 {\n  margin-top: -5px !important; }\n\n.m-t-n-10 {\n  margin-top: -10px !important; }\n\n.m-t-n-15 {\n  margin-top: -15px !important; }\n\n.m-t-n-20 {\n  margin-top: -20px !important; }\n\n.m-t-n-30 {\n  margin-top: -30px !important; }\n\n.m-t-n-40 {\n  margin-top: -40px !important; }\n\n.m-t-n-50 {\n  margin-top: -50px !important; }\n\n.m-r-0 {\n  margin-right: 0 !important; }\n\n.m-r-1 {\n  margin-right: 1px !important; }\n\n.m-r-5 {\n  margin-right: 5px !important; }\n\n.m-r-10 {\n  margin-right: 10px !important; }\n\n.m-r-15 {\n  margin-right: 15px !important; }\n\n.m-r-20 {\n  margin-right: 20px !important; }\n\n.m-r-30 {\n  margin-right: 30px !important; }\n\n.m-r-40 {\n  margin-right: 40px !important; }\n\n.m-r-50 {\n  margin-right: 50px !important; }\n\n.m-r-n-1 {\n  margin-right: -1px !important; }\n\n.m-r-n-5 {\n  margin-right: -5px !important; }\n\n.m-r-n-10 {\n  margin-right: -10px !important; }\n\n.m-r-n-15 {\n  margin-right: -15px !important; }\n\n.m-r-n-20 {\n  margin-right: -20px !important; }\n\n.m-r-n-30 {\n  margin-right: -30px !important; }\n\n.m-r-n-40 {\n  margin-right: -40px !important; }\n\n.m-r-n-50 {\n  margin-right: -50px !important; }\n\n.m-b-0 {\n  margin-bottom: 0 !important; }\n\n.m-b-1 {\n  margin-bottom: 1px !important; }\n\n.m-b-5 {\n  margin-bottom: 5px !important; }\n\n.m-b-10 {\n  margin-bottom: 10px !important; }\n\n.m-b-15 {\n  margin-bottom: 15px !important; }\n\n.m-b-20 {\n  margin-bottom: 20px !important; }\n\n.m-b-30 {\n  margin-bottom: 30px !important; }\n\n.m-b-40 {\n  margin-bottom: 40px !important; }\n\n.m-b-50 {\n  margin-bottom: 50px !important; }\n\n.m-b-n-1 {\n  margin-bottom: -1px !important; }\n\n.m-b-n-5 {\n  margin-bottom: -5px !important; }\n\n.m-b-n-10 {\n  margin-bottom: -10px !important; }\n\n.m-b-n-15 {\n  margin-bottom: -15px !important; }\n\n.m-b-n-20 {\n  margin-bottom: -20px !important; }\n\n.m-b-n-30 {\n  margin-bottom: -30px !important; }\n\n.m-b-n-40 {\n  margin-bottom: -40px !important; }\n\n.m-b-n-50 {\n  margin-bottom: -50px !important; }\n\n.p-0 {\n  padding: 0 !important; }\n\n.p-5 {\n  padding: 5px !important; }\n\n.p-10 {\n  padding: 10px !important; }\n\n.p-15 {\n  padding: 15px !important; }\n\n.p-20 {\n  padding: 20px !important; }\n\n.p-25 {\n  padding: 25px !important; }\n\n.p-30 {\n  padding: 30px !important; }\n\n.p-40 {\n  padding: 40px !important; }\n\n.p-50 {\n  padding: 50px !important; }\n\n.p-75 {\n  padding: 75px !important; }\n\n.p-100 {\n  padding: 100px !important; }\n\n.p-l-0 {\n  padding-left: 0 !important; }\n\n.p-l-5 {\n  padding-left: 5px !important; }\n\n.p-l-10 {\n  padding-left: 10px !important; }\n\n.p-l-15 {\n  padding-left: 15px !important; }\n\n.p-l-20 {\n  padding-left: 20px !important; }\n\n.p-l-25 {\n  padding-left: 25px !important; }\n\n.p-l-30 {\n  padding-left: 30px !important; }\n\n.p-l-40 {\n  padding-left: 40px !important; }\n\n.p-l-50 {\n  padding-left: 50px !important; }\n\n.p-l-75 {\n  padding-left: 75px !important; }\n\n.p-l-100 {\n  padding-left: 100px !important; }\n\n.p-b-0 {\n  padding-bottom: 0 !important; }\n\n.p-b-5 {\n  padding-bottom: 5px !important; }\n\n.p-b-10 {\n  padding-bottom: 10px !important; }\n\n.p-b-15 {\n  padding-bottom: 15px !important; }\n\n.p-b-20 {\n  padding-bottom: 20px !important; }\n\n.p-b-25 {\n  padding-bottom: 25px !important; }\n\n.p-b-30 {\n  padding-bottom: 30px !important; }\n\n.p-b-40 {\n  padding-bottom: 40px !important; }\n\n.p-b-50 {\n  padding-bottom: 50px !important; }\n\n.p-b-60 {\n  padding-bottom: 60px !important; }\n\n.p-b-70 {\n  padding-bottom: 70px !important; }\n\n.p-b-80 {\n  padding-bottom: 80px !important; }\n\n.p-b-90 {\n  padding-bottom: 90px !important; }\n\n.p-b-100 {\n  padding-bottom: 100px !important; }\n\n.p-t-0 {\n  padding-top: 0 !important; }\n\n.p-t-5 {\n  padding-top: 5px !important; }\n\n.p-t-10 {\n  padding-top: 10px !important; }\n\n.p-t-15 {\n  padding-top: 15px !important; }\n\n.p-t-20 {\n  padding-top: 20px !important; }\n\n.p-t-25 {\n  padding-top: 25px !important; }\n\n.p-t-30 {\n  padding-top: 30px !important; }\n\n.p-t-40 {\n  padding-top: 40px !important; }\n\n.p-t-50 {\n  padding-top: 50px !important; }\n\n.p-t-75 {\n  padding-top: 75px !important; }\n\n.p-t-100 {\n  padding-top: 100px !important; }\n\n.p-t-120 {\n  padding-top: 120px !important; }\n\n.p-t-130 {\n  padding-top: 130px !important; }\n\n.p-t-140 {\n  padding-top: 140px !important; }\n\n.p-t-150 {\n  padding-top: 150px !important; }\n\n.block {\n  display: block !important; }\n\n.img-xs {\n  width: 30px;\n  height: 30px; }\n\n.img-sm {\n  width: 35px;\n  height: 35px; }\n\n.img-md {\n  width: 55px;\n  height: 55px; }\n\n.img-lg {\n  width: 100px;\n  height: 100px; }\n\n.max-w-20 {\n  max-width: 20px !important; }\n\n.max-w-30 {\n  max-width: 30px !important; }\n\n.max-w-32 {\n  max-width: 35px !important; }\n\n.max-w-35 {\n  max-width: 35px !important; }\n\n.max-w-40 {\n  max-width: 40px !important; }\n\n.max-w-50 {\n  max-width: 50px !important; }\n\n.max-w-75 {\n  max-width: 75px !important; }\n\n.max-w-100 {\n  max-width: 100px !important; }\n\n.max-w-150 {\n  max-width: 150px !important; }\n\n.max-w-200 {\n  max-width: 200px !important; }\n\n.max-w-300 {\n  max-width: 300px !important; }\n\n.max-w-400 {\n  max-width: 400px !important; }\n\n.overflow-hidden {\n  overflow: hidden; }\n\n.overflow-auto {\n  overflow: auto; }\n\n.max-h-50 {\n  max-height: 50px !important; }\n\n.max-h-100 {\n  max-height: 100px !important; }\n\n.max-h-200 {\n  max-height: 200px !important; }\n\n.max-h-250 {\n  max-height: 250px !important; }\n\n.max-h-300 {\n  max-height: 300px !important; }\n\n.max-h-350 {\n  max-height: 300px !important; }\n\n.max-h-375 {\n  max-height: 300px !important; }\n\n.max-h-400 {\n  max-height: 400px !important; }\n\n.max-h-450 {\n  max-height: 450px !important; }\n\n.max-h-500 {\n  max-height: 500px !important; }\n\n.max-h-600 {\n  max-height: 600px !important; }\n\n.max-h-650 {\n  max-height: 650px !important; }\n\n.max-h-700 {\n  max-height: 700px !important; }\n\n.max-h-800 {\n  max-height: 800px !important; }\n\n.max-h-900 {\n  max-height: 900px !important; }\n\n.max-h-1000 {\n  max-height: 1000px !important; }\n\n.min-h-0 {\n  min-height: 0 !important; }\n\n.min-h-100 {\n  min-height: 100px !important; }\n\n.min-h-200 {\n  min-height: 200px !important; }\n\n.min-h-250 {\n  min-height: 250px !important; }\n\n.min-h-300 {\n  min-height: 300px !important; }\n\n.min-h-350 {\n  min-height: 300px !important; }\n\n.min-h-375 {\n  min-height: 300px !important; }\n\n.min-h-400 {\n  min-height: 400px !important; }\n\n.min-h-450 {\n  min-height: 450px !important; }\n\n.min-h-500 {\n  min-height: 500px !important; }\n\n.min-h-600 {\n  min-height: 600px !important; }\n\n.min-h-650 {\n  min-height: 650px !important; }\n\n.min-h-700 {\n  min-height: 700px !important; }\n\n.min-h-800 {\n  min-height: 800px !important; }\n\n.min-h-900 {\n  min-height: 900px !important; }\n\n.min-h-1000 {\n  min-height: 1000px !important; }\n\n.h-5 {\n  height: 5px !important; }\n\n.h-10 {\n  height: 10px !important; }\n\n.h-50 {\n  height: 50px !important; }\n\n.h-75 {\n  height: 75px !important; }\n\n.h-100 {\n  height: 100px !important; }\n\n.h-125 {\n  height: 125px !important; }\n\n.h-150 {\n  height: 150px !important; }\n\n.h-200 {\n  height: 200px !important; }\n\n.h-300 {\n  height: 300px !important; }\n\n.h-400 {\n  height: 400px !important; }\n\n.h-450 {\n  height: 450px !important; }\n\n.h-500 {\n  height: 500px !important; }\n\n.h-600 {\n  height: 600px !important; }\n\n.h-650 {\n  height: 650px !important; }\n\n.h-700 {\n  height: 700px !important; }\n\n.h-800 {\n  height: 800px !important; }\n\n.h-900 {\n  height: 900px !important; }\n\n.h-1000 {\n  height: 1000px !important; }\n\n.w-5 {\n  width: 5px !important; }\n\n.w-10 {\n  width: 10px !important; }\n\n.w-15 {\n  width: 15px !important; }\n\n.w-20 {\n  width: 20px !important; }\n\n.w-50 {\n  width: 20px !important; }\n\n.w-100 {\n  width: 100px !important; }\n\n.w-150 {\n  width: 150px !important; }\n\n.w-200 {\n  width: 200px !important; }\n\n.w-250 {\n  width: 250px !important; }\n\n.w-300 {\n  width: 300px !important; }\n\n.w-100p {\n  width: 100% !important; }\n\n.h-100p {\n  width: 100% !important; }\n\n.absolute {\n  position: absolute !important; }\n\n.relative {\n  position: relative !important; }\n\n.block {\n  display: block !important; }\n\n.inline-block {\n  display: inline-block !important; }\n\n.list-block li {\n  display: block !important; }\n\n.list-inline li {\n  display: inline !important; }\n\n.clear-both {\n  clear: both !important; }\n\n.line-height-normal {\n  line-height: normal !important; }\n\n.line-height-8 {\n  line-height: 8px !important; }\n\n.line-height-12 {\n  line-height: normal !important; }\n\nul.style-none {\n  margin: 0;\n  padding: 0;\n  list-style: none; }\n  ul.style-none li {\n    font-size: 0.875rem;\n    padding: 3px 0; }\n    ul.style-none li ul {\n      list-style: none; }\n\nul.vertical-icon-list {\n  margin: 0;\n  padding: 0;\n  list-style: none; }\n  ul.vertical-icon-list li {\n    font-size: 0.875rem;\n    padding: 6px 0; }\n    ul.vertical-icon-list li i {\n      font-size: 1.25rem;\n      padding-right: 15px;\n      vertical-align: middle; }\n\n.bg-green {\n  background: #28bebd !important; }\n\n.bg-blue {\n  background: #42a5f5 !important; }\n\n.bg-lightBlue {\n  background: #2ebaee !important; }\n\n.bg-red {\n  background: #ef5350 !important; }\n\n.bg-yellow {\n  background: #f8c200 !important; }\n\n.bg-paleYellow {\n  background: #fddd7e !important; }\n\n.bg-lightGray {\n  background: #e3ecf7 !important; }\n\n.bg-gray {\n  background: #8f9eb5 !important; }\n\n.bg-drakGray {\n  background: #707c94 !important; }\n\n.bg-grayBlue {\n  background: #59779b !important; }\n\n.bg-purple {\n  background: #6b79c4 !important; }\n\n.bg-turquoise {\n  background: #00c5dc !important; }\n\n.bg-peach {\n  background: #feb38d !important; }\n\n.bg-transparent {\n  background: transparent !important; }\n\n.text-green {\n  color: #28bebd !important; }\n\n.text-turquoise {\n  color: #00c5dc !important; }\n\n.text-red {\n  color: #ef5350 !important; }\n\n.text-cyan {\n  color: #26c6da !important; }\n\n.text-yellow {\n  color: #f8c200 !important; }\n\n.text-gray {\n  color: #8f9eb5 !important; }\n\n.text-blue {\n  color: #42a5f5 !important; }\n\n.text-orange {\n  color: #ffb74d !important; }\n\n.text-purple {\n  color: #6b79c4 !important; }\n\n.text-white {\n  color: #fff !important; }\n\n.text-brown {\n  color: #795548 !important; }\n\n.text-salmon {\n  color: #ee6e73 !important; }\n\n.text-muted {\n  color: #8396b0; }\n\n.color-black {\n  color: #000 !important; }\n\n.color-white {\n  color: #fff !important; }\n\n.bg-white {\n  background-color: #fff !important; }\n\n.transparent {\n  background: transparent !important; }\n\n.border-bottom,\n.border-grey-bottom-1px {\n  border-bottom: 1px solid rgba(215, 225, 237, 0.8) !important; }\n\n.border-grey-top-1px,\n.border-top {\n  border-top: 1px solid rgba(215, 225, 237, 0.6) !important; }\n\n.shadow-none {\n  box-shadow: none !important; }\n\n.shadow-z-1 {\n  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12); }\n\n.shadow-z-1:hover {\n  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15); }\n\n.shadow-z-2 {\n  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); }\n\n.shadow-z-3 {\n  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19); }\n\n.shadow-z-4 {\n  box-shadow: 0 16px 28px 0 rgba(0, 0, 0, 0.22), 0 25px 55px 0 rgba(0, 0, 0, 0.21); }\n\n.shadow-z-5 {\n  box-shadow: 0 27px 24px 0 rgba(0, 0, 0, 0.2), 0 40px 77px 0 rgba(0, 0, 0, 0.22); }\n\n.big-shadow {\n  box-shadow: 0 0 8px rgba(0, 0, 0, 0.18), 0 8px 16px rgba(0, 0, 0, 0.36); }\n\n.shadow-2dp {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12); }\n\n.shadow-3dp {\n  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 1px 8px 0 rgba(0, 0, 0, 0.12); }\n\n.shadow-4dp {\n  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2); }\n\n.shadow-6dp {\n  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2); }\n\n.shadow-8dp {\n  box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2); }\n\n.shadow-16dp {\n  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2); }\n\n.shadow-24dp {\n  box-shadow: 0 9px 46px 8px rgba(0, 0, 0, 0.14), 0 11px 15px -7px rgba(0, 0, 0, 0.12), 0 24px 38px 3px rgba(0, 0, 0, 0.2); }\n\n.font-weight-100 {\n  font-weight: 100 !important; }\n\n.font-weight-200 {\n  font-weight: 200 !important; }\n\n.font-weight-300 {\n  font-weight: 300 !important; }\n\n.font-weight-400 {\n  font-weight: 400 !important; }\n\n.font-weight-500 {\n  font-weight: 500 !important; }\n\n.font-weight-600 {\n  font-weight: 600 !important; }\n\n.font-weight-700 {\n  font-weight: 700 !important; }\n\n.font-weight-800 {\n  font-weight: 800 !important; }\n\n.font-weight-900 {\n  font-weight: 900 !important; }\n\n.font-weight-light {\n  font-weight: 100 !important; }\n\n.font-weight-normal {\n  font-weight: 300 !important; }\n\n.font-weight-medium {\n  font-weight: 400 !important; }\n\n.font-weight-bold {\n  font-weight: 500 !important; }\n\n.font-size-0 {\n  font-size: 0 !important; }\n\n.font-size-10 {\n  font-size: 10px !important; }\n\n.font-size-11 {\n  font-size: 11px !important; }\n\n.font-size-12 {\n  font-size: 12px !important; }\n\n.font-size-14 {\n  font-size: 14px !important; }\n\n.font-size-16 {\n  font-size: 16px !important; }\n\n.font-size-18 {\n  font-size: 18px !important; }\n\n.font-size-20 {\n  font-size: 20px !important; }\n\n.font-size-24 {\n  font-size: 24px !important; }\n\n.font-size-26 {\n  font-size: 26px !important; }\n\n.font-size-30 {\n  font-size: 30px !important; }\n\n.font-size-40 {\n  font-size: 40px !important; }\n\n.font-size-50 {\n  font-size: 50px !important; }\n\n.font-size-60 {\n  font-size: 60px !important; }\n\n.font-size-70 {\n  font-size: 70px !important; }\n\n.font-size-80 {\n  font-size: 80px !important; }\n\n.hidden {\n  display: none !important; }\n\n@media (max-width: 576px) {\n  .d-xs-none {\n    display: none !important; }\n  .d-xs-inline {\n    display: inline !important; }\n  .d-xs-inline-block {\n    display: inline-block !important; }\n  .d-xs-block {\n    display: block !important; }\n  .d-xs-table {\n    display: table !important; }\n  .d-xs-table-cell {\n    display: table-cell !important; }\n  .d-xs-flex {\n    display: -ms-flexbox !important;\n    display: -webkit-box !important;\n    display: flex !important; }\n  .d-xs-inline-flex {\n    display: -ms-inline-flexbox !important;\n    display: -webkit-inline-box !important;\n    display: inline-flex !important; } }\n\n:host /deep/ .navbar-form {\n  position: absolute;\n  top: -150%;\n  left: 0;\n  right: 0;\n  margin: 0;\n  padding: 0;\n  height: 65px;\n  z-index: 20;\n  transition: all 0.2s;\n  border: 0;\n  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);\n  background: #fff;\n  left: 240px; }\n\n:host /deep/ .navbar-form .form-group {\n  height: 100%;\n  width: 100%;\n  margin-top: 0;\n  padding-bottom: 0; }\n\n:host /deep/ .navbar-form .form-control {\n  height: 100%;\n  border: 0;\n  border-radius: 0;\n  width: 100%;\n  background-image: none !important;\n  padding-left: 20px; }\n\n:host /deep/ .navbar-form.open {\n  top: 0; }\n\n:host /deep/ .navbar-form .close-search {\n  height: 30px;\n  cursor: pointer;\n  top: 50%;\n  margin-top: -15px;\n  line-height: 30px;\n  margin-right: 10px;\n  font-size: 1.375rem;\n  position: absolute;\n  right: 30px; }\n\n@media (max-width: 992px) {\n  :host /deep/ .navbar-form.open {\n    left: 0; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/layout/top-navbar/search/search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SearchComponent = /** @class */ (function () {
    function SearchComponent() {
        this.searchStatus = false;
        this.searchValue = '';
    }
    SearchComponent.prototype.closeSearch = function () {
        this.searchStatus = false;
        this.searchValue = null;
    };
    SearchComponent.prototype.ngOnInit = function () {
    };
    SearchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'topbar-search',
            template: __webpack_require__("./src/app/layout/top-navbar/search/search.component.html"),
            styles: [__webpack_require__("./src/app/layout/top-navbar/search/search.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].Emulated,
        }),
        __metadata("design:paramtypes", [])
    ], SearchComponent);
    return SearchComponent;
}());

//# sourceMappingURL=search.component.js.map

/***/ }),

/***/ "./src/app/layout/top-navbar/top-navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<nav role=\"navigation\" class=\"navbar\">\n\t<ul class=\"navbar-nav nav-left\">\n\t\t<li class=\"nav-item hidden-sm\">\n\t\t\t<a md-ripple href=\"javascript:void(0)\" (click)=\"toggleAppMobileLeftMenuSidebar()\" class=\"nav-link mobile-menu-trigger\">\n\t\t\t\t<i class=\"mdi mdi-backburger\"></i>\n\t\t\t</a>\n\t\t</li>\n\t\t<li class=\"nav-item hidden-sm-down\">\n\t\t\t<a md-ripple href=\"/dashboards\" class=\"nav-link\">\n\t\t\t\t<span>Home</span>\n\t\t\t</a>\n\t\t</li>\n\t\t<li class=\"nav-item dropdown dropdown-lg app_menu_launcher hidden-sm-down\" dropdown>\n\t\t\t<a md-ripple href=\"javascript:void(0)\" class=\"nav-link\" dropdownToggle>\n\t\t\t\t<span>Dropdown</span>\n\t\t\t\t<span class=\"caret\"></span>\n\t\t\t</a>\n\t\t\t<ul class=\"dropdown-menu dropdown-lg-menu min-h-200 p-15 \" *dropdownMenu>\n\t\t\t\t<li>\n\t\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</li>\n\t\t<li class=\"nav-item dropdown mega hidden-sm-down\" dropdown>\n\t\t\t<a md-ripple href=\"javascript:void(0)\" class=\"nav-link\" dropdownToggle>\n\t\t\t\t<span>Mega</span>\n\t\t\t\t<span class=\"caret\"></span>\n\t\t\t</a>\n\t\t\t<div class=\"dropdown-menu dropdown-menu full-width min-h-200 p-15\" *dropdownMenu>\n\t\t\t\n\t\t\t</div>\n\t\t</li>\n\t</ul>\n\t<ul class=\"navbar-nav nav-right\">\n\t\t<li class=\"nav-item dropdown avatar-menu hidden-sm-down\" dropdown>\n\t\t\t<a md-ripple href=\"javascript:void(0)\" class=\"nav-link\" dropdownToggle>\n\t\t\t\t<span class=\"meta\">\n\t\t\t\t\t<span class=\"avatar\">\n\t\t\t\t\t\t<img src=\"assets/img/profiles/02.jpg\" alt=\"\" class=\"img-circle max-w-35\">\n\t\t\t\t\t\t<i class=\"badge mini success status\"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class=\"name\">Mike Jones</span>\n\t\t\t\t\t<span class=\"caret\"></span>\n\t\t\t\t</span>\n\t\t\t</a>\n\t\t\t<ul class=\"dropdown-menu btn-accent dropdown-menu-right min-h-200\" *dropdownMenu>\n\t<li>\n\t\t\n\t</li>\n\t\t\t</ul>\n\t\t</li>\n\t\t<li class=\"nav-item\">\n\t\t\t<a md-ripple href=\"javascript:void(0)\" (click)=\"search.searchStatus = true\" class=\"nav-link\">\n\t\t\t\t<i class=\"zmdi zmdi-search\"></i>\n\t\t\t</a>\n\t\t</li>\n\t\t<li class=\"nav-item dropdown dropdown-lg hidden-sm-down\" dropdown>\n\t\t\t<a md-ripple href=\"javascript:void(0)\" class=\"nav-link\" dropdownToggle>\n\t\t\t\t<i class=\"zmdi zmdi-invert-colors\"></i>\n\t\t\t</a>\n\t\t\t<ul class=\"dropdown-menu dropdown-lg-menu dropdown-menu-right p-15 color-container\" *dropdownMenu>\n\t\t\t\t<li class=\"title\">\n\t\t\t\t\t<h3>Preset Color Options</h3>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<div class=\"color-option-check\">\n\t\t\t\t\t\t<label for=\"theme-a\">\n\t\t\t\t\t\t\t<input id=\"theme-a\" type=\"radio\" name=\"setting-theme\" [(ngModel)]=\"currentTheme\" (ngModelChange)=\"setTheme()\" value=\"A\" />\n\t\t\t\t\t\t\t<span class=\"icon-check\"></span>\n\t\t\t\t\t\t\t<span class=\"split\">\n\t\t\t\t\t\t\t\t<span class=\"color bg-primary-theme-a\"></span>\n\t\t\t\t\t\t\t\t<span class=\"color bg-shade-theme-a\"></span>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t<span class=\"color bg-menu-darkBlue\"></span>\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<div class=\"color-option-check\">\n\t\t\t\t\t\t<label for=\"theme-b\">\n\t\t\t\t\t\t\t<input id=\"theme-b\" type=\"radio\" name=\"setting-theme\" [(ngModel)]=\"currentTheme\" (ngModelChange)=\"setTheme()\" value=\"B\" />\n\t\t\t\t\t\t\t<span class=\"icon-check\"></span>\n\t\t\t\t\t\t\t<span class=\"split\">\n\t\t\t\t\t\t\t\t<span class=\"color bg-primary-theme-b\"></span>\n\t\t\t\t\t\t\t\t<span class=\"color bg-shade-theme-b\"></span>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t<span class=\"color bg-menu-darkBlue\"></span>\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<div class=\"color-option-check\">\n\t\t\t\t\t\t<label for=\"theme-c\">\n\t\t\t\t\t\t\t<input id=\"theme-c\" type=\"radio\" name=\"setting-theme\" [(ngModel)]=\"currentTheme\" (ngModelChange)=\"setTheme()\" value=\"C\" />\n\t\t\t\t\t\t\t<span class=\"icon-check\"></span>\n\t\t\t\t\t\t\t<span class=\"split\">\n\t\t\t\t\t\t\t\t<span class=\"color bg-primary-theme-c\"></span>\n\t\t\t\t\t\t\t\t<span class=\"color bg-shade-theme-c\"></span>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t<span class=\"color bg-menu-darkBlue\"></span>\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<div class=\"color-option-check\">\n\t\t\t\t\t\t<label for=\"theme-d\">\n\t\t\t\t\t\t\t<input id=\"theme-d\" type=\"radio\" name=\"setting-theme\" [(ngModel)]=\"currentTheme\" (ngModelChange)=\"setTheme()\" value=\"D\" />\n\t\t\t\t\t\t\t<span class=\"icon-check\"></span>\n\t\t\t\t\t\t\t<span class=\"split\">\n\t\t\t\t\t\t\t\t<span class=\"color bg-primary-theme-d\"></span>\n\t\t\t\t\t\t\t\t<span class=\"color bg-shade-theme-d\"></span>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t<span class=\"color bg-menu-darkBlue\"></span>\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<div class=\"color-option-check\">\n\t\t\t\t\t\t<label for=\"theme-e\">\n\t\t\t\t\t\t\t<input id=\"theme-e\" type=\"radio\" name=\"setting-theme\" [(ngModel)]=\"currentTheme\" (ngModelChange)=\"setTheme()\" value=\"E\" />\n\t\t\t\t\t\t\t<span class=\"icon-check\"></span>\n\t\t\t\t\t\t\t<span class=\"split\">\n\t\t\t\t\t\t\t\t<span class=\"color bg-primary-theme-e\"></span>\n\t\t\t\t\t\t\t\t<span class=\"color bg-shade-theme-e\"></span>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t<span class=\"color bg-menu-white\"></span>\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<div class=\"color-option-check\">\n\t\t\t\t\t\t<label for=\"theme-f\">\n\t\t\t\t\t\t\t<input id=\"theme-f\" type=\"radio\" name=\"setting-theme\" [(ngModel)]=\"currentTheme\" (ngModelChange)=\"setTheme()\" value=\"F\" />\n\t\t\t\t\t\t\t<span class=\"icon-check\"></span>\n\t\t\t\t\t\t\t<span class=\"split\">\n\t\t\t\t\t\t\t\t<span class=\"color bg-primary-theme-f\"></span>\n\t\t\t\t\t\t\t\t<span class=\"color bg-shade-theme-f\"></span>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t<span class=\"color bg-menu-white\"></span>\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<div class=\"color-option-check\">\n\t\t\t\t\t\t<label for=\"theme-g\">\n\t\t\t\t\t\t\t<input id=\"theme-g\" type=\"radio\" name=\"setting-theme\" [(ngModel)]=\"currentTheme\" (ngModelChange)=\"setTheme()\" value=\"G\" />\n\t\t\t\t\t\t\t<span class=\"icon-gheck\"></span>\n\t\t\t\t\t\t\t<span class=\"split\">\n\t\t\t\t\t\t\t\t<span class=\"color bg-primary-theme-g\"></span>\n\t\t\t\t\t\t\t\t<span class=\"color bg-shade-theme-g\"></span>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t<span class=\"color bg-menu-white\"></span>\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<div class=\"color-option-check\">\n\t\t\t\t\t\t<label for=\"theme-h\">\n\t\t\t\t\t\t\t<input id=\"theme-h\" type=\"radio\" name=\"setting-theme\" [(ngModel)]=\"currentTheme\" (ngModelChange)=\"setTheme()\" value=\"H\" />\n\t\t\t\t\t\t\t<span class=\"icon-check\"></span>\n\t\t\t\t\t\t\t<span class=\"split\">\n\t\t\t\t\t\t\t\t<span class=\"color bg-primary-theme-h\"></span>\n\t\t\t\t\t\t\t\t<span class=\"color bg-shade-theme-h\"></span>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t<span class=\"color bg-menu-white\"></span>\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</li>\n\t\t<li class=\"nav-item\">\n\t\t\t<a md-ripple href=\"javascript:void(0)\" (click)=\"toggleAppRightSidebar()\" class=\"nav-link\">\n\t\t\t\t<i [ngClass]=\"{'mdi-playlist-minus': false, 'mdi-playlist-plus': true}\" class=\"mdi\"></i>\n\t\t\t</a>\n\t\t</li>\n\t</ul>\n</nav>\n<topbar-search #search></topbar-search>\n"

/***/ }),

/***/ "./src/app/layout/top-navbar/top-navbar.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/layout/top-navbar/top-navbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopNavbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_state__ = __webpack_require__("./src/app/app.state.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_config_config_service__ = __webpack_require__("./src/app/shared/services/config/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_themes_themes_service__ = __webpack_require__("./src/app/shared/services/themes/themes.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TopNavbarComponent = /** @class */ (function () {
    function TopNavbarComponent(config, _elementRef, _state, themes) {
        var _this = this;
        this.config = config;
        this._elementRef = _elementRef;
        this._state = _state;
        this.themes = themes;
        this._state.subscribe('app.isApp_MobileSidebarLeftOpen', function (isApp_MobileSidebarLeftOpen) {
            _this.config.appLayout.isApp_MobileSidebarLeftOpen = isApp_MobileSidebarLeftOpen;
        });
        this._state.subscribe('app.isApp_BackdropVisible', function (isApp_BackdropVisible) {
            _this.config.appLayout.isApp_BackdropVisible = isApp_BackdropVisible;
        });
        this._state.subscribe('app.isApp_SidebarRightOpen', function (isApp_SidebarRightOpen) {
            _this.config.appLayout.isApp_SidebarRightOpen = isApp_SidebarRightOpen;
        });
    }
    TopNavbarComponent.prototype.ngOnInit = function () {
    };
    TopNavbarComponent.prototype.setTheme = function () {
        this.themes.setTheme(this.currentTheme);
    };
    TopNavbarComponent.prototype.toggleAppMobileLeftMenuSidebar = function () {
        this.config.appLayout.isApp_MobileSidebarLeftOpen = !this.config.appLayout.isApp_MobileSidebarLeftOpen;
        this.config.appLayout.isApp_BackdropVisible = !this.config.appLayout.isApp_BackdropVisible;
        this._state.notifyDataChanged('app.isApp_MobileSidebarLeftOpen', this.config.appLayout.isApp_MobileSidebarLeftOpen);
        this._state.notifyDataChanged('app.isApp_BackdropVisible', this.config.appLayout.isApp_BackdropVisible);
        return false;
    };
    TopNavbarComponent.prototype.toggleAppRightSidebar = function () {
        this.config.appLayout.isApp_SidebarRightOpen = !this.config.appLayout.isApp_SidebarRightOpen;
        this.config.appLayout.isApp_BackdropVisible = !this.config.appLayout.isApp_BackdropVisible;
        this._state.notifyDataChanged('app.isApp_SidebarRightOpen', this.config.appLayout.isApp_SidebarRightOpen);
        this._state.notifyDataChanged('app.isApp_BackdropVisible', this.config.appLayout.isApp_BackdropVisible);
        return false;
    };
    TopNavbarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "app-header",
            template: __webpack_require__("./src/app/layout/top-navbar/top-navbar.component.html"),
            styles: [__webpack_require__("./src/app/layout/top-navbar/top-navbar.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].Emulated,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_config_config_service__["a" /* ConfigService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_config_config_service__["a" /* ConfigService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__app_state__["a" /* GlobalState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__app_state__["a" /* GlobalState */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__shared_services_themes_themes_service__["a" /* ThemesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_services_themes_themes_service__["a" /* ThemesService */]) === "function" && _d || Object])
    ], TopNavbarComponent);
    return TopNavbarComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=top-navbar.component.js.map

/***/ }),

/***/ "./src/app/shared/directives/nav-dropdown.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NavDropdownDirective */
/* unused harmony export NavDropdownToggleDirective */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavDropDownDirectives; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavDropdownDirective = /** @class */ (function () {
    function NavDropdownDirective(el) {
        this.el = el;
    }
    NavDropdownDirective.prototype.toggle = function () {
        this.el.nativeElement.classList.toggle('open');
    };
    NavDropdownDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[appNavDropdown]'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
    ], NavDropdownDirective);
    return NavDropdownDirective;
    var _a;
}());

var NavDropdownToggleDirective = /** @class */ (function () {
    function NavDropdownToggleDirective(dropdown) {
        this.dropdown = dropdown;
    }
    NavDropdownToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        this.dropdown.toggle();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NavDropdownToggleDirective.prototype, "toggleOpen", null);
    NavDropdownToggleDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[appNavDropdownToggle]'
        }),
        __metadata("design:paramtypes", [NavDropdownDirective])
    ], NavDropdownToggleDirective);
    return NavDropdownToggleDirective;
}());

var NavDropDownDirectives = [NavDropdownDirective, NavDropdownToggleDirective];
//# sourceMappingURL=nav-dropdown.directive.js.map

/***/ }),

/***/ "./src/app/shared/directives/scrollbar.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollbarDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ScrollbarDirective = /** @class */ (function () {
    function ScrollbarDirective(el) {
        this.el = el;
    }
    ScrollbarDirective.prototype.ngOnInit = function () {
        $(this.el.nativeElement).mCustomScrollbar({
            autoHideScrollbar: false,
            theme: "light",
            advanced: {
                updateOnContentResize: true
            }
        });
    };
    ScrollbarDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'scrollbar',
            host: { 'class': 'mCustomScrollbar' },
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
    ], ScrollbarDirective);
    return ScrollbarDirective;
    var _a;
}());

//# sourceMappingURL=scrollbar.directive.js.map

/***/ })

});
//# sourceMappingURL=layout.module.chunk.js.map