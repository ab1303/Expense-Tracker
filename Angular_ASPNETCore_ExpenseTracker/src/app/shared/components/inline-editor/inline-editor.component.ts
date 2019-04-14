

import { Component, Input } from "@angular/core";
import { InlineConfig } from "./types/inline-configs";


const defaultConfig: InlineConfig = {
    name: "",
    required: false,
       empty: "empty",
    placeholder: "placeholder",
    disabled: false,
    saveOnBlur: false,
    saveOnChange: false,
    saveOnEnter: true,
    editOnClick: true,
    cancelOnEscape: true,
    hideButtons: false,
    onlyValue: true,
};

@Component({
    selector: 'inline-editor',
    templateUrl: './inline-editor.component.html'
})
export class InlineEditor {
    isEditing: boolean = false;
    hasInlineEdit: boolean = false;
    hasInlineDisplay: boolean = false;

    @Input() label: string;

    public editMode() {
        this.isEditing = true;
    }

    public normalMode() {
        this.isEditing = false;
    }

}
