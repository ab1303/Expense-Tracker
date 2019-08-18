import { Component, AfterViewInit, ViewChild, OnDestroy, ViewChildren, QueryList } from "@angular/core";
import { BehaviorSubject, Subscription, Observable } from "rxjs/Rx";
import { v4 as uuid } from "uuid";

import { Item } from "./item.model";
import { FilterTextComponent } from "../../../shared/components/filter-text/filter-text.component";
import { tap } from "rxjs/operators/tap";
import { ToggleCardItemComponent } from "../../../shared/components/toggle-card-item/toggle-card-item.component";
import { from, combineLatest, of, interval, Subject } from "rxjs";
import { mergeAll, map, mergeMap, switchAll, merge, switchMap } from "rxjs/operators";
import { ExpenseCategoryService } from "../expense-category/expense-category.service";
import { ExpenseCategoryApiResponse } from "../expense-category/expense-category";
import { publishReplay } from "rxjs-compat/operator/publishReplay";

@Component({
    selector: "field-category-mapping",
    templateUrl: "./field-category-mapping.component.html",
    styleUrls: ["./field-category-mapping.component.scss"]
})
export class FieldCategoryMappingComponent implements AfterViewInit, OnDestroy {
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
    private sourceClicksSubscriptions: { [key: string]: BehaviorSubject<Observable<Item>> } = {};
    private categoryClicksSubscriptions: { [key: string]: BehaviorSubject<Observable<Item>> } = {};

    // View Refs
    @ViewChild("filterSources") filterSources: FilterTextComponent;
    @ViewChildren("source", { read: ToggleCardItemComponent }) sourceCardItems!: QueryList<ToggleCardItemComponent>;
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

    sourceCardItemsArray$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(this.sourceCardItemsArray);
    sourceCardItemsUpdate$: Subject<any> = new Subject<any>();
    sourceFilter$: Observable<string>;

    categoryCardItemsArray$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
    categoryCardItemsUpdate$: Subject<any> = new Subject<any>();
    categoryFilter$: Observable<string>;
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
            this.categoryCardItemsArray = categories;
            this.categoryCardItemsArray$.next(categories);
        });
    }
    ngAfterViewInit() {
        this.sourceCardItems.changes.subscribe(() => {
            setTimeout(() => {
                this.sourceCardItems.forEach(si => {
                    if (!this.sourceClicksSubscriptions[si.item.id]) {
                        this.sourceClicksSubscriptions[si.item.id] = new BehaviorSubject(si.clicks$);
                    } else {
                        this.sourceClicksSubscriptions[si.item.id].next(si.clicks$);
                    }
                });
                this.sourceCardItemsUpdate$.next();
            }, 0);
        });

        this.categoryCardItems.changes.subscribe(() => {
            setTimeout(() => {
                this.categoryCardItems.forEach(ci => {
                    if (!this.categoryClicksSubscriptions[ci.item.id]) {
                        this.categoryClicksSubscriptions[ci.item.id] = new BehaviorSubject(ci.clicks$);
                    } else {
                        this.categoryClicksSubscriptions[ci.item.id].next(ci.clicks$);
                    }
                });
                this.categoryCardItemsUpdate$.next();
            }, 0);
        });

        this.sourceCardItemsUpdate$.subscribe(() => {
            (<any>Object).entries(this.sourceClicksSubscriptions).forEach(([key, subjectClick$]) => {
                if (subjectClick$.observers.length === 0) {
                    this.subscriptions[`${key}`] = subjectClick$.pipe(switchAll()).subscribe(newItem => {
                        console.log(`source Item clicked:`, newItem);
                        this.sourceCardItemsArray.map(si => {
                            if (si.id === newItem.id) {
                                si.isActive = !si.isActive;
                                return si;
                            }
                            si.isActive = false;
                            return si;
                        });
                    });
                }
            });
        });

        this.categoryCardItemsUpdate$.subscribe(() => {
            (<any>Object).entries(this.categoryClicksSubscriptions).forEach(([key, subjectClick$]) => {
                if (subjectClick$.observers.length === 0) {
                    this.subscriptions[`${key}`] = subjectClick$.pipe(switchAll()).subscribe(newItem => {
                        console.log(`category Item clicked:`, newItem);
                        this.categoryCardItemsArray.map(ci => {
                            if (ci.id === newItem.id) {
                                ci.isActive = !ci.isActive;
                                return ci;
                            }
                            ci.isActive = false;
                            return ci;
                        });
                    });
                }
            });
        });

        this.subscriptions.sourceFilterSubscription =
            this.filterSources &&
            this.filterSources.filterText$
                .pipe(
                    tap(filterText =>
                        this.sourceCardItemsArray$.next(
                            this.sourceCardItemsArray.filter(src => {
                                return src.text.startsWith(filterText);
                            })
                        )
                    )
                )
                .subscribe();
    }

    saveEditable(value) {
        //call to http service
    }
    onAddSourceItem(data) {
        if (!data) return;

        if (!this.sourceCardItemsArray.find(src => src.text === data)) {
            this.sourceCardItemsArray = [
                ...this.sourceCardItemsArray,
                {
                    id: uuid(),
                    text: data,
                    isActive: false
                }
            ];
        }
        this.sourceCardItemsArray$.next(this.sourceCardItemsArray);
    }

    onRemoveItem(data) {
        console.log(data);
        if (!data) return;
        this.sourceCardItemsArray = this.sourceCardItemsArray.filter(s => s.text !== data);
        this.sourceCardItemsArray$.next(this.sourceCardItemsArray);
    }
}
