
import { Component } from "@angular/core";
import { InlineEditor } from "./inline-editor.component";

@Component({
    selector: 'inline-edit',
    template: `
    <div>
      <ng-content *ngIf="inlineEditor.isEditing"></ng-content>
    </div>`
})
export class InlineEdit {
    constructor(public inlineEditor: InlineEditor) {
        inlineEditor.hasInlineEdit = true;
    }
}