import { Component, AfterViewInit, ViewChild, OnDestroy, ViewChildren, QueryList } from "@angular/core";
import { BehaviorSubject, Subscription, Observable } from "rxjs/Rx";
import { v4 as uuid } from "uuid";

import { Item } from "./item.model";
import { FilterTextComponent } from "../../../shared/components/filter-text/filter-text.component";
import { tap } from "rxjs/operators/tap";
import { ToggleCardItemComponent } from "../../../shared/components/toggle-card-item/toggle-card-item.component";
import { from, combineLatest } from "rxjs";
import { mergeAll, map } from "rxjs/operators";
import { ExpenseCategoryService } from "../expense-category/expense-category.service";
import { ExpenseCategoryApiResponse } from "../expense-category/expense-category";

@Component({
    selector: "field-category-mapping",
    templateUrl: "./field-category-mapping.component.html",
    styleUrls: ["./field-category-mapping.component.scss"]
})
export class FieldCategoryMappingComponent implements AfterViewInit, OnDestroy {
    private sourceValues: Item[] = [
        {
            // id: uuid(),
            id: "1",
            text: "Test",
            isActive: false
        },
        {
            id: "2",
            text: "Test1",
            isActive: false
        },
        {
            id: "3",
            text: "Test2",
            isActive: false
        }
    ];

    editableText: string;
    private subscriptions: { [key: string]: Subscription } = {};

    // View Refs
    @ViewChild("filterSources") filterSources: FilterTextComponent;
    @ViewChildren(ToggleCardItemComponent) toggleCardItems!: QueryList<ToggleCardItemComponent>;

    // service observables
    expenseCategories$: Observable<ExpenseCategoryApiResponse> = this.expenseCategoryService.getExpenseCategories();
    sourceValues$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(this.sourceValues);
    toggleCardItemsArray$: Array<Observable<any>> = [];

    sourceFilter$: Observable<string>;

  
    vm$: Observable<any>;

    /**
     *
     */
    constructor(private expenseCategoryService: ExpenseCategoryService) {}

    ngOnDestroy(): void {
        (<any>Object).values(this.subscriptions).forEach(subscription => subscription.unsubscribe());
    }

    ngAfterViewInit() {
        this.toggleCardItems.forEach(cardItem => this.toggleCardItemsArray$.push(cardItem.clicks$));

        this.subscriptions.sourceFilterSubscription = this.filterSources && this.filterSources.filterText$
            .pipe(
                tap(filterText =>
                    this.sourceValues$.next(
                        this.sourceValues.filter(src => {
                            return src.text.startsWith(filterText);
                        })
                    )
                )
            )
            .subscribe();

        this.subscriptions.cardItemClicksSubscription = from(this.toggleCardItemsArray$)
            .pipe(
                mergeAll(),

                // think switchMap fro sourceValue$...??
                tap(newItem => {
                    console.log(`Item clicked:`, newItem);
                    this.sourceValues = this.sourceValues.map(item => {
                        if (item.id === newItem.id) {
                            item.isActive = !item.isActive;
                            return item;
                        }

                        item.isActive = false;
                        return item;
                    });
                    this.sourceValues$.next(this.sourceValues);
                })
            )
            .subscribe();

        this.vm$ = combineLatest(this.sourceValues$, this.expenseCategories$).pipe(
            map(([sourceValues, expenseCategoriesApiResponse]) => ({
                sourceValues,
                expenseCategories: expenseCategoriesApiResponse.expenseCategories
            }))
        );
    }

    saveEditable(value) {
        //call to http service
    }

    onAddSourceItem(data) {
        if (!data) return;

        if (!this.sourceValues.find(src => src.text === data)) {
            this.sourceValues.push({
                id: uuid(),
                text: data,
                isActive: false
            });
        }

        this.sourceValues$.next(this.sourceValues);
    }

    onRemoveItem(data) {
        console.log(data);
        if (!data) return;
        this.sourceValues = this.sourceValues.filter(s => s.text !== data);
        this.sourceValues$.next(this.sourceValues);
    }
}
