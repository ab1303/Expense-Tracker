import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "toggle-card-item",
    styleUrls: ["./toggle-card-item.component.scss"],
    template: `
        <div class="card-item" (click)="toggle = !toggle" [style.background-color]="toggle ? activeColor : inActiveColor">
            {{ label }}
        </div>
    `
})
export class ToggleCardItemComponent implements OnInit {
    @Input() label: string;
    @Input() activeColor: string;
    @Input() inActiveColor: string = '#f1f2f2';

    toggle: boolean = false;

    constructor() {}

    ngOnInit() {}
}
