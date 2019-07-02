import { Component, OnInit, Input, HostBinding } from "@angular/core";

@Component({
    selector: "app-filter-text",
    templateUrl: "./filter-text.component.html",
    styleUrls: ["./filter-text.component.scss"]
})
export class FilterTextComponent {
    @Input() normalLabel: string;
    @Input() filterLabel: string;

    isFiltering: boolean = false;

}
