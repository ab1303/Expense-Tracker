import { Component, OnDestroy, ViewChildren, QueryList } from "@angular/core";
import { Subscription, Observable } from "rxjs/Rx";
import { v4 as uuid } from "uuid";

import { Item } from "./item.model";
import { ToggleCardItemComponent } from "../../../shared/components/toggle-card-item/toggle-card-item.component";
import { map } from "rxjs/operators";
import { ExpenseCategoryService } from "../expense-category/expense-category.service";

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

    editableText: string;
    private subscriptions: { [key: string]: Subscription } = {};

    // View Refs
    @ViewChildren("destination", { read: ToggleCardItemComponent }) categoryCardItems!: QueryList<ToggleCardItemComponent>;

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

    vm$: Observable<any>;

    /**
     *
     */
    constructor(private expenseCategoryService: ExpenseCategoryService) {}

    ngOnDestroy(): void {
        (<any>Object).values(this.subscriptions).forEach(subscription => subscription.unsubscribe());
    }

    ngOnInit(): void {
        this.expenseCategories$.subscribe(categories => {
            this.categoryCardItemsArray = [...categories];
        });
    }

    saveEditable(value) {
        //call to http service
    }
}
