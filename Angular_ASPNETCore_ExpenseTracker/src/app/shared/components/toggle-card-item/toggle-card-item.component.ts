import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "toggle-card-item",
    styleUrls: ["./toggle-card-item.component.scss"],
    template: `
        <div class="card-item" (click)="toggle = !toggle" [style.background-color]="toggle ? activeColor : inActiveColor">
            <span>
                {{ label }}
            </span>
            <i (click)="onRemove.emit(label)">remove</i>
        </div>
    `
})
export class ToggleCardItemComponent implements OnInit {
    @Input() label: string;
    @Input() activeColor: string;
    @Input() inActiveColor: string = "#f1f2f2";

    @Output() onRemove: EventEmitter<string> = new EventEmitter<string>();

    toggle: boolean = false;

    constructor() {}

    ngOnInit() {}
}
