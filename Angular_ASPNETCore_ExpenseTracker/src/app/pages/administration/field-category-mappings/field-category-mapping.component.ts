import { Component, OnDestroy, ViewChildren, QueryList } from "@angular/core";
import { Subscription, Observable } from "rxjs/Rx";
import { v4 as uuid } from "uuid";

import { Item } from "./item.model";
import { map } from "rxjs/operators";
import { ExpenseCategoryService } from "../expense-category/expense-category.service";
import { ToastrService } from "ngx-toastr";
import { CategoryMappingService } from "./category-mapping.service";
import { CategoryMapping } from "./types/category-mapping.model";
import { FieldCategory } from "./types/field-category.model";

@Component({
    selector: "field-category-mapping",
    templateUrl: "./field-category-mapping.component.html",
    styleUrls: ["./field-category-mapping.component.scss"]
})
export class FieldCategoryMappingComponent implements OnDestroy {
    private sourceCardItemsArray: Item[] = [
        {
            id: uuid(),
            text: "Test1",
            isActive: false
        },
        {
            id: uuid(),
            text: "Test2",
            isActive: false
        },
        {
            id: uuid(),
            text: "Test3",
            isActive: false
        }
    ];

    private categoryCardItemsArray: Item[] = [];
    private categoryMappingsArray: CategoryMapping[] = [];

    editableText: string;
    private subscriptions: { [key: string]: Subscription } = {};

    expenseCategories$: Observable<Item[]> = this.expenseCategoryService.getExpenseCategories().pipe(
        map(r =>
            r.expenseCategories.map(category => {
                return {
                    id: category.id.toString(),
                    text: category.name,
                    isActive: false
                };
            })
        )
    );

    categoryMappings$: Observable<CategoryMapping[]> = this.categoryMappingService.getCategoryMappings(FieldCategory.ExpenseCategory).pipe(
        map(r =>
            r.categoryMappings.map(cm => {
                return {
                    id: cm.id,
                    sourceValue: cm.sourceValue,
                    destinationValue: cm.destinationValue,
                };
            })
        )
    );

    vm$: Observable<any>;

    /**
     *
     */
    constructor(
        private toastrService: ToastrService,
        private expenseCategoryService: ExpenseCategoryService,
        private categoryMappingService: CategoryMappingService
    ) {}

    ngOnDestroy(): void {
        (<any>Object).values(this.subscriptions).forEach(subscription => subscription.unsubscribe());
    }

    ngOnInit(): void {
        this.expenseCategories$.subscribe(categories => {
            this.categoryCardItemsArray = [...categories];
        });

        this.categoryMappings$.subscribe(cm => {
            this.categoryMappingsArray = [...cm];
        });
    }

    sourceItemAdded(sourceName) {
        console.log("source item added", sourceName);
        this.sourceCardItemsArray = this.listItemAdded({ id: uuid(), name: sourceName }, this.sourceCardItemsArray);
    }

    sourceItemRemoved(sourceItem) {
        console.log("source item removed", sourceItem);
        this.sourceCardItemsArray = this.listItemRemoved(sourceItem, this.sourceCardItemsArray);
    }

    categoryItemAdded(categoryName) {
        console.log("category item added", categoryName);
        this.expenseCategoryService.addExpenseCategory(categoryName, "").subscribe(response => {
            this.categoryCardItemsArray = this.listItemAdded({ id: response.model, name: categoryName }, this.categoryCardItemsArray);

            this.toastrService.success("Expense category added");
        });
    }

    categoryItemRemoved(categoryItem) {
        console.log("category item removed", categoryItem);
        this.expenseCategoryService.deleteExpenseCategory(categoryItem.id).subscribe(response => {
            this.categoryCardItemsArray = this.listItemRemoved(categoryItem, this.categoryCardItemsArray);
            this.toastrService.success("Expense category deleted");
        });
    }

    listItemAdded(item, collection) {
        if (!collection.find(src => src.text === item)) {
            return [
                ...collection,
                {
                    id: item.id,
                    text: item.name,
                    isActive: false
                }
            ];
        }

        return collection;
    }

    listItemRemoved(listItem, collection) {
        if (!listItem) return;
        return collection.filter(s => s.text !== listItem.text);
    }

    saveEditable(value) {
        //call to http service
    }
}
