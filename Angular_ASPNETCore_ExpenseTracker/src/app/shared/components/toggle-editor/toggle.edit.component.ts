
import { Component } from "@angular/core";
import { ToggleEditor } from "./toggle.editor.component";

@Component({
    selector: 'toggle-edit',
    template: `
    <div>
      <ng-content *ngIf="toggleEditor.isEditing"></ng-content>
    </div>`
})
export class ToggleEdit {
    constructor(public toggleEditor: ToggleEditor) {
        toggleEditor.hasToggleEdit = true;
    }
}