
import { Component } from "@angular/core";
import { InlineEditor } from "./inline.editor.component";

@Component({
    selector: 'inline-normal',
    template: `
    <div (click)="gotoEditMode()">
      <ng-content *ngIf="!inlineEditor.isEditing"></ng-content>
    </div>
    `
})
export class ToggleNormal {
    constructor(public inlineEditor: InlineEditor) {
        inlineEditor.hasToggleNormal = true;
    }

    gotoEditMode(){
      this.inlineEditor.editMode();
    }

}