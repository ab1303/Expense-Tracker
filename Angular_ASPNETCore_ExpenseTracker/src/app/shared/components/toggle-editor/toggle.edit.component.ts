
import { Component } from "@angular/core";

@Component({
    selector: 'toggle-edit',
    template:'<ng-content *ngIf="!toggleEditor.isEditing"></ng-content>'
})
export class ToggleEdit {

}