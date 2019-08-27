import { Component, Input, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit, OnInit, SimpleChanges } from "@angular/core";
import { Observable, Subscription, BehaviorSubject, Subject } from "rxjs";
import { tap, switchAll } from "rxjs/operators";
import { Item } from "../../../pages/administration/field-category-mappings/item.model";
import { FilterTextComponent } from "../filter-text/filter-text.component";
import { ToggleCardItemComponent } from "../toggle-card-item/toggle-card-item.component";
import { v4 as uuid } from "uuid";

@Component({
    selector: "card-item-list",
    styleUrls: ["./card-item-list.component.scss"],
    templateUrl: "./card-item-list.component.html"
})
export class CardItemListComponent implements OnInit, AfterViewInit {
    @Input() label: string;
    private filterLabel: string;
    private editorLabel: string;
    private subscriptions: { [key: string]: Subscription } = {};
    private clicksSubscriptions: { [key: string]: BehaviorSubject<Observable<Item>> } = {};

    // View Refs
    @ViewChild("filterItems") filterItems: FilterTextComponent;
    @ViewChildren(ToggleCardItemComponent) cardItems!: QueryList<ToggleCardItemComponent>;

    @Input("items") cardItemsArray: Array<Item>;

    cardItemsArray$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
    cardItemsUpdate$: Subject<any> = new Subject<any>();
    sourceFilter$: Observable<string>;

    constructor(public elementRef: ElementRef) {}

    ngOnInit(): void {
        this.setupClicksSubscription();
        this.filterLabel = `Filter ${this.label}`;
        this.editorLabel = `${this.label} Category`;
    }

    ngOnChanges(changes: SimpleChanges) {
        // changes.prop contains the old and the new value...
        if(changes.cardItemsArray.previousValue !== changes.cardItemsArray.currentValue){
            this.cardItemsArray$.next(this.cardItemsArray);
        }
      }

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
            this.setupClicksSubscription();
        });

        this.cardItemsUpdate$.subscribe(() => {
            (<any>Object).entries(this.clicksSubscriptions).forEach(([key, subjectClick$]) => {
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

    setupClicksSubscription(){
        setTimeout(() => {
            this.cardItems.forEach(si => {
                if (!this.clicksSubscriptions[si.item.id]) {
                    this.clicksSubscriptions[si.item.id] = new BehaviorSubject(si.clicks$);
                } else {
                    this.clicksSubscriptions[si.item.id].next(si.clicks$);
                }
            });
            this.cardItemsUpdate$.next();
        }, 0);
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
