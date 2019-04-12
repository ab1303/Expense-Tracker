import { HostListener, Directive, AfterViewChecked, ElementRef } from "@angular/core";
import { ToggleEditor } from "./toggle.editor.component";

@Directive({
    selector: '[toggleEditInputRef]'
})
export class ToggleEditInputRef implements AfterViewChecked {
    constructor(public toggleEditor: ToggleEditor, private elRef:ElementRef) {

    }

    @HostListener("blur")
    onBlur() {
        this.toggleEditor.normalMode();
    }

    
    ngAfterViewChecked() {
        if (this.toggleEditor.isEditing) {
            this.elRef.nativeElement.focus();
        }
    }
}