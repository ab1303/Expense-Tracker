

import { Component, Input } from "@angular/core";

@Component({
    selector: 'toggle-editor',
    templateUrl: './toggle.editor.component.html'
})
export class ToggleEditor {
    isEditing: boolean = false;
    hasToggleEdit: boolean = false;
    hasToggleNormal: boolean = false;

    @Input() label: string;
  
    constructor(){
        console.log('toggle editor constructor');
    }

    toggle() {
        this.isEditing = !this.isEditing;
    }

}
