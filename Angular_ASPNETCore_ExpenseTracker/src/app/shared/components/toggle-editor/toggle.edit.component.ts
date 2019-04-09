
import { Component } from "@angular/core";
import { ToggleEditor } from "./toggle.editor.component";

@Component({
    selector: 'toggle-edit',
    template: '<ng-content *ngIf="toggleEditor.isEditing"></ng-content>'
})
export class ToggleEdit {
    constructor(public toggleEditor: ToggleEditor) {
        toggleEditor.hasToggleEdit = true;
    }
}