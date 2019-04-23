
import { Component } from "@angular/core";
import { InlineEditor } from "./inline-editor.component";

@Component({
    selector: 'inline-normal',
    template: `
    <div (click)="inlineEditor.edit({ editing: true })">
      <ng-content *ngIf="!inlineEditor.state.isEditing()"></ng-content>
    </div>
    `
})
export class InlineDisplay {
    constructor(public inlineEditor: InlineEditor) {
        inlineEditor.hasInlineDisplay = true;
    }
}