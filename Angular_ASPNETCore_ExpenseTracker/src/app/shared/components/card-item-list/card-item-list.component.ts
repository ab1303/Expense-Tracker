import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit } from "@angular/core";
import { Observable, Subscription, BehaviorSubject, Subject } from "rxjs";
import { tap, map, share, switchAll } from "rxjs/operators";
import { Item } from "../../../pages/administration/field-category-mappings/item.model";
import { FilterTextComponent } from "../filter-text/filter-text.component";
import { ToggleCardItemComponent } from "../toggle-card-item/toggle-card-item.component";
import { v4 as uuid } from "uuid";

@Component({
    selector: "card-item-list",
    styleUrls: ["./card-item-list.component.scss"],
    template: `
        <app-filter-text #filterItems [normalLabel]="'Source'" [filterLabel]="'Filter Source'"></app-filter-text>

        <inline-editor [label]="'Source Category'" (onBlur)="onAddItem($event)" (onEnter)="onAddItem($event)">
            <inline-normal>
                <div class="add-item">
                    <mat-icon>add</mat-icon>
                </div>
            </inline-normal>
            <inline-edit>
                <div class="input-item">
                    <input inlineEditInputRef type="text" />
                </div>
            </inline-edit>
        </inline-editor>
        <div class="body">
            <div *ngFor="let cardItem of cardItemsArray$ | async">
                <toggle-card-item (onRemove)="onRemoveItem($event)" [item]="cardItem" [activeColor]="'#5ed07d'"></toggle-card-item>
            </div>
        </div>
    `
})
export class CardItemListComponent implements AfterViewInit {
    @Input() label:string;
    @Input() cardItemsArray: Array<Item>;
    // TODO: Take as input
    // private cardItemsArray: Item[] = [
    //     {
    //         id: uuid(),
    //         text: "Test1",
    //         isActive: false
    //     },
    //     {
    //         id: uuid(),
    //         text: "Test2",
    //         isActive: false
    //     },
    //     {
    //         id: uuid(),
    //         text: "Test3",
    //         isActive: false
    //     }
    // ];

    private subscriptions: { [key: string]: Subscription } = {};
    private sourceClicksSubscriptions: { [key: string]: BehaviorSubject<Observable<Item>> } = {};

    // View Refs
    @ViewChild("filterItems") filterItems: FilterTextComponent;
    @ViewChildren(ToggleCardItemComponent) cardItems!: QueryList<ToggleCardItemComponent>;

    cardItemsArray$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(this.cardItemsArray); // TODO: Fetch items
    cardItemsUpdate$: Subject<any> = new Subject<any>();
    sourceFilter$: Observable<string>;

    constructor(public elementRef: ElementRef) {}

    ngOnDestroy(): void {
        (<any>Object).values(this.subscriptions).forEach(subscription => subscription.unsubscribe());
    }
    ngAfterViewInit() {
        this.subscriptions.sourceFilterSubscription =
            this.filterItems &&
            this.filterItems.filterText$
                .pipe(
                    tap(filterText =>
                        this.cardItemsArray$.next(
                            this.cardItemsArray.filter(src => {
                                return src.text.startsWith(filterText);
                            })
                        )
                    )
                )
                .subscribe();

        this.cardItems.changes.subscribe(() => {
            setTimeout(() => {
                this.cardItems.forEach(si => {
                    if (!this.sourceClicksSubscriptions[si.item.id]) {
                        this.sourceClicksSubscriptions[si.item.id] = new BehaviorSubject(si.clicks$);
                    } else {
                        this.sourceClicksSubscriptions[si.item.id].next(si.clicks$);
                    }
                });
                this.cardItemsUpdate$.next();
            }, 0);
        });

        this.cardItemsUpdate$.subscribe(() => {
            (<any>Object).entries(this.sourceClicksSubscriptions).forEach(([key, subjectClick$]) => {
                if (subjectClick$.observers.length === 0) {
                    this.subscriptions[`${key}`] = subjectClick$.pipe(switchAll()).subscribe(newItem => {
                        console.log(`source Item clicked:`, newItem);
                        this.cardItemsArray.map(si => {
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
    }

    onAddItem(data) {
        if (!data) return;

        if (!this.cardItemsArray.find(src => src.text === data)) {
            this.cardItemsArray = [
                ...this.cardItemsArray,
                {
                    id: uuid(),
                    text: data,
                    isActive: false
                }
            ];
        }
        this.cardItemsArray$.next(this.cardItemsArray);
    }

    onRemoveItem(data) {
        console.log(data);
        if (!data) return;
        this.cardItemsArray = this.cardItemsArray.filter(s => s.text !== data);
        this.cardItemsArray$.next(this.cardItemsArray);
    }
}
