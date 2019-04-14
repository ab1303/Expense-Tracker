
import { Component } from "@angular/core";
import { InlineEditor } from "./inline.editor.component";

@Component({
    selector: 'inline-edit',
    template: `
    <div>
      <ng-content *ngIf="inlineEditor.isEditing"></ng-content>
    </div>`
})
export class ToggleEdit {
    constructor(public inlineEditor: InlineEditor) {
        inlineEditor.hasToggleEdit = true;
    }
}