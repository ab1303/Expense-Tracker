import { Component, OnInit, Input, EventEmitter, Output, ElementRef } from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import { tap, map } from "rxjs/operators";

@Component({
    selector: "toggle-card-item",
    styleUrls: ["./toggle-card-item.component.scss"],
    template: `
        <div class="card-item" [style.background-color]="isActive ? activeColor : inActiveColor">
            <span>
                {{ label }}
            </span>
            <i (click)="onRemove.emit(label)">remove</i>
        </div>
    `
})
export class ToggleCardItemComponent implements OnInit {
    @Input() id: string;
    @Input() label: string;
    @Input() isActive: boolean;
    @Input() activeColor: string;
    @Input() inActiveColor: string = "#f1f2f2";

    @Output() onRemove: EventEmitter<string> = new EventEmitter<string>();

    clicks$: Observable<any>;

    constructor(public elementRef: ElementRef) {}

    ngOnInit() {
        this.clicks$ = fromEvent(this.elementRef.nativeElement, "click").pipe(map(() => this.id));
    }
}
