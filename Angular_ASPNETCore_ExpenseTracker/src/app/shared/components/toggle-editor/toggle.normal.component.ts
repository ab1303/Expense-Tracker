
import { Component } from "@angular/core";
import { ToggleEditor } from "./toggle.editor.component";

@Component({
    selector: 'toggle-normal',
    template: `
    <div (click)="gotoEditMode()">
      <ng-content *ngIf="!toggleEditor.isEditing"></ng-content>
    </div>
    `
})
export class ToggleNormal {
    constructor(public toggleEditor: ToggleEditor) {
        toggleEditor.hasToggleNormal = true;
    }

    gotoEditMode(){
      this.toggleEditor.editMode();
    }

}