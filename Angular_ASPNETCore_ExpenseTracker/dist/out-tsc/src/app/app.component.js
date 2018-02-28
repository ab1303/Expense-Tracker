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
var platform_browser_1 = require("@angular/platform-browser");
var app_state_1 = require("./app.state");
var config_service_1 = require("./shared/services/config/config.service");
var preloader_service_1 = require("./shared/services/preloader/preloader.service");
var spinner_service_1 = require("./shared/services/spinner/spinner.service");
var themes_service_1 = require("./shared/services/themes/themes.service");
var AppComponent = /** @class */ (function () {
    // The constructor is called first time before the ngOnInit()
    // The constructor should only be used to initialize class members but shouldn't do actual "work".
    // So you should use constructor() to setup Dependency Injection and not much else.
    function AppComponent(_state, config, viewContainerRef, _spinner, titleService, themesService) {
        this._state = _state;
        this.config = config;
        this.viewContainerRef = viewContainerRef;
        this._spinner = _spinner;
        this.titleService = titleService;
        this.themesService = themesService;
    }
    Object.defineProperty(AppComponent.prototype, "isApp_SidebarLeftCollapsed", {
        // App Left Sidebar Menu Open/Close Desktop
        get: function () {
            return this.config.appLayout.isApp_SidebarLeftCollapsed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "isApp_MobileSidebarLeftOpen", {
        // Left Menu Sidebar Open/Close Tablet & Mobile
        get: function () {
            return this.config.appLayout.isApp_MobileSidebarLeftOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "isApp_SidebarRightOpen", {
        // App Right Sidebar Open/Close
        get: function () {
            return this.config.appLayout.isApp_SidebarRightOpen;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    // called after the constructor and called  after the first ngOnChanges()
    // ngOnInit() is better place to "start" - it's where/when components' bindings are resolved.
    AppComponent.prototype.ngOnInit = function () {
        $(document).on('click', '[href="#"]', function (e) { return e.preventDefault(); });
    };
    // check if menu should reset on resize
    AppComponent.prototype.onWindowResize = function () {
        if (this._shouldMenuReset()) {
            this.config.appLayout.isApp_SidebarLeftCollapsed = false;
        }
    };
    AppComponent.prototype._shouldMenuReset = function () {
        return window.innerWidth <= this.config.breakpoint.desktopLG;
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        preloader_service_1.PreloaderService.load().then(function (values) {
            _this._spinner.hide();
        });
    };
    __decorate([
        core_1.HostBinding('class.app_sidebar-menu-collapsed'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], AppComponent.prototype, "isApp_SidebarLeftCollapsed", null);
    __decorate([
        core_1.HostBinding('class.app_sidebar-left-open'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], AppComponent.prototype, "isApp_MobileSidebarLeftOpen", null);
    __decorate([
        core_1.HostBinding('class.sidebar-overlay-open'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], AppComponent.prototype, "isApp_SidebarRightOpen", null);
    __decorate([
        core_1.HostListener('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "onWindowResize", null);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: '<router-outlet></router-outlet>',
            styleUrls: ['./app.component.scss']
        }),
        __metadata("design:paramtypes", [app_state_1.GlobalState,
            config_service_1.ConfigService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService,
            platform_browser_1.Title,
            themes_service_1.ThemesService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map