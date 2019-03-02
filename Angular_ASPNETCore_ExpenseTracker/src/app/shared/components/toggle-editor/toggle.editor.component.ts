

import { Component, ContentChild } from "@angular/core";
import { ToggleNormal } from "./toggle.normal.component";
import { ToggleEdit } from "./toggle.edit.component";

@Component({
    selector: 'toggle-editor',
    templateUrl: './toggle.editor.component.html'
})
export class ToggleEditor {
    isEditing: boolean = false;
    @ContentChild(ToggleNormal) toggleNormal: ToggleNormal;
    @ContentChild(ToggleEdit) toggleEdit: ToggleEdit;

}