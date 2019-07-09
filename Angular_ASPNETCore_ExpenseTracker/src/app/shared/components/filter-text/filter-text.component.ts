import { Component, Input, Inject, PLATFORM_ID, Output, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
    selector: "app-filter-text",
    templateUrl: "./filter-text.component.html",
    styleUrls: ["./filter-text.component.scss"]
})
export class FilterTextComponent {
    isFiltering: boolean = false;
    filterCtrl: FormControl = new FormControl();

    @Input() normalLabel: string;
    @Input() filterLabel: string;

    @Output("filter") filterText$: Observable<string>;

    // @ViewChild("filterElem") elRef: ElementRef;

    @ViewChild("filterElem") set inputElement(elRef: ElementRef) {
        if (elRef && isPlatformBrowser(this.platformId)) {
            this.isFiltering ? elRef.nativeElement.focus() : elRef.nativeElement.blur();
            this.cdRef.detectChanges();
        }
    }

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private cdRef: ChangeDetectorRef) {
        this.filterText$ = this.filterCtrl.valueChanges;
    }

    toggleFiltering() {
        this.isFiltering = !this.isFiltering;
    }
}
