

import {
    Component, Input
}
    from "@angular/core";

@Component({
    selector: 'inline-editor',
    templateUrl: './inline.editor.component.html'
})
export class InlineEditor  {
    isEditing: boolean = false;
    hasToggleEdit: boolean = false;
    hasToggleNormal: boolean = false;

    @Input() label: string;

    public editMode() {
        this.isEditing = true;
    }

    public normalMode() {
        this.isEditing = false;
    }

}
