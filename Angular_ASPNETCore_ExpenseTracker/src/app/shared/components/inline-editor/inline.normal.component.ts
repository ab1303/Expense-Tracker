
import { Component } from "@angular/core";
import { InlineEditor } from "./inline-editor.component";

@Component({
    selector: 'inline-normal',
    template: `
    <div (click)="gotoEditMode()">
      <ng-content *ngIf="!inlineEditor.isEditing"></ng-content>
    </div>
    `
})
export class InlineDisplay {
    constructor(public inlineEditor: InlineEditor) {
        inlineEditor.hasInlineDisplay = true;
    }

    gotoEditMode(){
      this.inlineEditor.editMode();
    }

}