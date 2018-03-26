"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var expense_category_component_1 = require("./expense-category.component");
var shared_module_1 = require("../../../shared/shared.module");
var ExpenseCategory_ROUTE = [
    { path: '', component: expense_category_component_1.ExpenseCategoryComponent },
];
var ExpenseCategoryModule = /** @class */ (function () {
    function ExpenseCategoryModule() {
    }
    ExpenseCategoryModule = __decorate([
        core_1.NgModule({
            declarations: [expense_category_component_1.ExpenseCategoryComponent],
            imports: [
                common_1.CommonModule,
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(ExpenseCategory_ROUTE)
            ]
        })
    ], ExpenseCategoryModule);
    return ExpenseCategoryModule;
}());
exports.ExpenseCategoryModule = ExpenseCategoryModule;
//# sourceMappingURL=expense-category.module.js.map