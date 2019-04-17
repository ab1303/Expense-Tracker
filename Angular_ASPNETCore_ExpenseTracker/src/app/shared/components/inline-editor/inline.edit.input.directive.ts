import {
  HostListener,
  Directive,
  AfterViewChecked,
  ElementRef
} from "@angular/core";
import { InlineEditor } from "./inline-editor.component";
import { InlineEditorState } from "./types/inline-editor-state.class";

@Directive({
  selector: "[inlineEditInputRef]"
})
export class InlineEditInputRef implements AfterViewChecked {
  constructor(public inlineEditor: InlineEditor, private elRef: ElementRef) {}

  @HostListener("blur")
  onBlur() {
    // this.inlineEditor.normalMode(); // imperative programming

    // reactive programming

    this.inlineEditor.service.events.internal.onBlur.emit({
        event: null,
        state: new InlineEditorState(),
    });
  }

  ngAfterViewChecked() {
    if (this.inlineEditor.state.isEditing()) {
      this.elRef.nativeElement.focus();
    }
  }
}
