
import { Component } from "@angular/core";
import { ToggleEditor } from "./toggle.editor.component";

@Component({
    selector: 'toggle-normal',
    template:'<ng-content *ngIf="!toggleEditor.isEditing"></ng-content>'
})
export class ToggleNormal {
    constructor(private toggleEditor:ToggleEditor){

    }

}