import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Subject, Observable, BehaviorSubject } from "rxjs/Rx";

@Component({
    selector: "field-category-mapping",
    templateUrl: "./field-category-mapping.component.html",
    styleUrls: ["./field-category-mapping.component.scss"]
})
export class FieldCategoryMappingComponent  {
   
    private sourceValues: string[] = ['Test', 'Test1', 'Test2'];
    private sourceValues$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.sourceValues);

    editableText: string;

   
    saveEditable(value) {
        //call to http service
    }

    filterSources(filterText) {
        this.sourceValues$.next(this.sourceValues.filter(src => {
            return src.startsWith(filterText);
        }));
    }
    onAddSourceItem(data) {
        if (!data) return;
        this.sourceValues.push(data);
        this.sourceValues$.next(this.sourceValues);
    }

    onRemoveItem(data) {
        console.log(data);
        if (!data) return;
        this.sourceValues = this.sourceValues.filter(s => s !== data);
        this.sourceValues$.next(this.sourceValues);
    }
}
