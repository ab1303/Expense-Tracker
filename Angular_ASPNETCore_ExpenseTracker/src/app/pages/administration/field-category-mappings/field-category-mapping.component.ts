import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs/Rx";
import { v4 as uuid } from "uuid";

import { Item } from "./item.model";
import { FilterTextComponent } from "../../../shared/components/filter-text/filter-text.component";
import { tap } from "rxjs/operators/tap";

@Component({
    selector: "field-category-mapping",
    templateUrl: "./field-category-mapping.component.html",
    styleUrls: ["./field-category-mapping.component.scss"]
})
export class FieldCategoryMappingComponent implements AfterViewInit, OnDestroy {
    ngOnDestroy(): void {
        (<any>Object).values(this.subscriptions).forEach(subscription =>
            subscription.unsubscribe()
          );
    }

    ngAfterViewInit() {
        this.subscriptions.filterSourcesSubscription = this.filterSources.filterText$.pipe(
            tap(filterText =>
                this.sourceValues$.next(
                    this.sourceValues.filter(src => {
                        return src.text.startsWith(filterText);
                    })
                )
            )
        ).subscribe();
    }

    private sourceValues: Item[] = [
        {
            id: uuid(),
            text: "Test"
        },
        {
            id: uuid(),
            text: "Test1"
        },
        {
            id: uuid(),
            text: "Test2"
        }
    ];
    private sourceValues$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(this.sourceValues);
    private subscriptions: { [key: string]: Subscription } = {};

    @ViewChild("filterSources")
    filterSources: FilterTextComponent;

    editableText: string;

   

    saveEditable(value) {
        //call to http service
    }

    onAddSourceItem(data) {
        if (!data) return;

        if (!this.sourceValues.find(src => src.text === data)) {
            this.sourceValues.push({
                id: uuid(),
                text: data
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
