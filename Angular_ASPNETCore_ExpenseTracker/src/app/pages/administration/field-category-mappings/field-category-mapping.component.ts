import { Component, AfterViewInit, ViewChild, OnDestroy, ViewChildren, QueryList } from "@angular/core";
import { BehaviorSubject, Subscription, Observable } from "rxjs/Rx";
import { v4 as uuid } from "uuid";

import { Item } from "./item.model";
import { FilterTextComponent } from "../../../shared/components/filter-text/filter-text.component";
import { tap } from "rxjs/operators/tap";
import { ToggleCardItemComponent } from "../../../shared/components/toggle-card-item/toggle-card-item.component";
import { from, combineLatest, of, interval } from "rxjs";
import { mergeAll, map, mergeMap, switchAll, merge, switchMap } from "rxjs/operators";
import { ExpenseCategoryService } from "../expense-category/expense-category.service";
import { ExpenseCategoryApiResponse } from "../expense-category/expense-category";
import { publishReplay } from 'rxjs-compat/operator/publishReplay';

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
    private sourceClicksSubscriptions: { [key: string]: Observable<any> } = {}; 
    private categoryClicksSubscriptions: { [key: string]: Observable<any> } = {}; 

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
    sourceCardItemsClicks$: BehaviorSubject<Observable<any>[]> = new BehaviorSubject<Observable<any>[]>([]);
    sourceFilter$: Observable<string>;

    categoryCardItemsArray$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
    categoryCardItemsClicks$: BehaviorSubject<Observable<any>[]> = new BehaviorSubject<Observable<any>[]>([]);

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
        this.categoryCardItems.changes.subscribe(() => {
            setTimeout(() => {
                const categoryItemsArray$ = [];
                this.categoryCardItems.forEach(ci => {
                    if(!this.categoryClicksSubscriptions[ci.item.id]){
                        this.categoryClicksSubscriptions[ci.item.id] = ci.clicks$;
                        categoryItemsArray$.push(ci.clicks$);
                    }
                });
                this.categoryCardItemsClicks$.next(categoryItemsArray$);
            }, 0);
        });

        this.sourceCardItems.changes.subscribe(() => {
            setTimeout(() => {
                const sourceItemsArray$ = [];
                this.sourceCardItems.forEach(si => {
                    if(!this.sourceClicksSubscriptions[si.item.id]){
                        this.sourceClicksSubscriptions[si.item.id] = si.clicks$;
                        sourceItemsArray$.push(si.clicks$);
                    }
                }); 
                this.sourceCardItemsClicks$.next(sourceItemsArray$);
            }, 0);
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

        this.subscriptions.categoryItemClicksSubscription = this.categoryCardItemsClicks$
            .pipe(
                mergeMap(array$ => from(array$)),
                mergeAll()
            )
            .subscribe(newItem => {
                console.log(`category Item clicked:`, newItem);
                this.categoryCardItemsArray.map(ec => {
                    if (ec.id === newItem.id) {
                        ec.isActive = !ec.isActive;
                        return ec;
                    }
                    ec.isActive = false;
                    return ec;
                });
            });

        this.subscriptions.sourceItemClicksSubscription = this.sourceCardItemsClicks$
            .pipe(
                mergeMap(array$ => from(array$)),
                mergeAll(),
            )
            .subscribe(newItem => {
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

        // var interval$ = interval(1000);
        // from([interval$, interval$])
        //     .pipe(mergeAll())
        //     .subscribe(_ => console.log("interval", _));

        // this.vm$ = combineLatest(this.sourceCardItemsArray$, this.expenseCategories$).pipe(
        //     map(([sourceCardItemsArray, expenseCategories]) => ({
        //         sourceCardItemsArray,
        //         expenseCategories
        //     }))
        // );
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
