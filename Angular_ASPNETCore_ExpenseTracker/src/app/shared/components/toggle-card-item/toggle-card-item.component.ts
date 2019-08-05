import { Component, OnInit, Input, EventEmitter, Output, ElementRef } from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import { tap, map } from "rxjs/operators";

@Component({
    selector: "toggle-card-item",
    styleUrls: ["./toggle-card-item.component.scss"],
    template: `
        <div class="card-item" [style.background-color]="item.isActive ? activeColor : inActiveColor">
            <span>
                {{ item.text }}
            </span>
            <i (click)="onRemove.emit(item.text)">remove</i>
        </div>
    `
})
export class ToggleCardItemComponent implements OnInit {
    @Input() item: {
        id: string;
        text: string;
        isActive: boolean;
    };
    @Input() activeColor: string;
    @Input() inActiveColor: string = "#f1f2f2";

    @Output() onRemove: EventEmitter<string> = new EventEmitter<string>();

    clicks$: Observable<any>;

    constructor(public elementRef: ElementRef) {}

    ngOnInit() {
        this.clicks$ = fromEvent(this.elementRef.nativeElement, "click").pipe(map(() => {
            console.log(this.item);
            return this.item;
        }));
    }
}
