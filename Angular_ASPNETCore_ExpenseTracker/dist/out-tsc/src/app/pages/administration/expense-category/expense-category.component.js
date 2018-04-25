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
var expense_category_service_1 = require("./expense-category.service");
var ExpenseCategoryComponent = /** @class */ (function () {
    function ExpenseCategoryComponent(expenseCategoryService) {
        this.expenseCategoryService = expenseCategoryService;
        this.expenseCategories = [];
    }
    ExpenseCategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.expenseCategoryService
            .getExpenseCategories()
            .subscribe(function (data) {
            _this.expenseCategories = data.expenseCategories;
        });
    };
    ExpenseCategoryComponent = __decorate([
        core_1.Component({
            selector: 'expense-category',
            templateUrl: './expense-category.component.html',
            styleUrls: ['./expense-category.component.scss']
        }),
        __metadata("design:paramtypes", [expense_category_service_1.ExpenseCategoryService])
    ], ExpenseCategoryComponent);
    return ExpenseCategoryComponent;
}());
exports.ExpenseCategoryComponent = ExpenseCategoryComponent;
//# sourceMappingURL=expense-category.component.js.map