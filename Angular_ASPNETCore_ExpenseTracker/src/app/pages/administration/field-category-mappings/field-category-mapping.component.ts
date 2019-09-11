import { Component, OnDestroy, ViewChildren, QueryList, ViewChild, ElementRef } from "@angular/core";
import { Subscription, Observable, Subject } from "rxjs/Rx";
import { v4 as uuid } from "uuid";

import { Item } from "./item.model";
import { map, tap, switchMap } from "rxjs/operators";
import { ExpenseCategoryService } from "../expense-category/expense-category.service";
import { ToastrService } from "ngx-toastr";
import { CategoryMappingService } from "./category-mapping.service";
import { CategoryMapping } from "./types/category-mapping.model";
import { FieldCategory } from "./types/field-category.model";
import { CardItemListComponent } from "../../../shared/components/card-item-list/card-item-list.component";
import { fromEvent } from "rxjs";
import { GenericBaseApiResponse } from "../../../shared/model/api-responses/GenericBaseApiResponse";
import { BaseApiResponse } from "../../../shared/model/api-responses/base-api-response";

@Component({
    selector: "field-category-mapping",
    templateUrl: "./field-category-mapping.component.html",
    styleUrls: ["./field-category-mapping.component.scss"]
})
export class FieldCategoryMappingComponent implements OnDestroy {
    @ViewChild("sourceList") sourceList: CardItemListComponent;
    @ViewChild("targetList") targetList: CardItemListComponent;
    @ViewChild("addBtn") addMappingButton: ElementRef;

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
                    destinationValue: cm.destinationValue
                };
            })
        )
    );

    vm$: Observable<any>;
    beginMapping$: Subject<any> = new Subject<any>();
    selectMapping$: Observable<any>;
    addMappingAction$: Observable<any>;

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
        Observable.combineLatest([this.expenseCategories$, this.categoryMappings$])
            .pipe(
                tap(([categories, categoryMappings]) => {
                    this.categoryCardItemsArray = [...categories];
                    this.categoryMappingsArray = [...categoryMappings];
                })
            )
            .subscribe();
    }

    ngAfterViewInit(): void {
        // initiate mapping

        this.addMappingAction$ = fromEvent(this.addMappingButton.nativeElement, "click");
        this.selectMapping$ = Observable.combineLatest([this.sourceList.onItemClick, this.targetList.onItemClick]);

        this.beginMapping$
            .pipe(
                switchMap(() =>
                    Observable.combineLatest([this.addMappingAction$, this.selectMapping$]).pipe(
                        tap(([_, [source, target]]) => {
                            this.categoryMappingService
                                .addCategoryMapping(FieldCategory.ExpenseCategory, (<Item>source).text, (<Item>target).text)
                                .subscribe((mapping: GenericBaseApiResponse<number>) => {
                                    this.categoryMappingsArray = [
                                        ...this.categoryMappingsArray,
                                        {
                                            id: mapping.model,
                                            sourceValue: source.text,
                                            destinationValue: target.text
                                        }
                                    ];

                                    this.clearItemSelection(source, this.sourceCardItemsArray);
                                    this.clearItemSelection(target, this.categoryCardItemsArray);
                                });
                        })
                    )
                )
            )
            .subscribe(() => this.beginMapping$.next());

        this.beginMapping$.next();
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

    removeCategoryMapping(mappingId) {
        this.categoryMappingService.deleteCategoryMapping(mappingId).subscribe((response: BaseApiResponse) => {
            this.categoryMappingsArray = [...this.categoryMappingsArray.filter(cm => cm.id !== mappingId)];
        });

        console.log("remove mapping id:", mappingId);
    }

    private clearItemSelection(item, collection) {
        return collection.map(si => {
            if (si.id === item.id) {
                si.isActive = false;
                return si;
            }
            return si;
        });
    }

    private listItemAdded(item, collection) {
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

    private listItemRemoved(listItem, collection) {
        if (!listItem) return;
        return collection.filter(s => s.text !== listItem.text);
    }
}
