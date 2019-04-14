import { HostListener, Directive, AfterViewChecked, ElementRef } from "@angular/core";
import { InlineEditor } from "./inline-editor.component";

@Directive({
    selector: '[inlineEditInputRef]'
})
export class InlineEditInputRef implements AfterViewChecked {
    constructor(public inlineEditor: InlineEditor, private elRef:ElementRef) {

    }

    @HostListener("blur")
    onBlur() {
        this.inlineEditor.normalMode();
    }

    
    ngAfterViewChecked() {
        if (this.inlineEditor.isEditing) {
            this.elRef.nativeElement.focus();
        }
    }
}