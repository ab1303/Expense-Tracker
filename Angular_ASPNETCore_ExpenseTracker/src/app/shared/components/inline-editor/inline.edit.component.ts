import { Component, ContentChildren, ContentChild } from "@angular/core";
import { InlineEditor } from "./inline-editor.component";
import { InlineEditInputRef } from "./inline.edit.input.directive";

@Component({
  selector: "inline-edit",
  template: `
    <div>
      <ng-content *ngIf="inlineEditor.state.isEditing()"></ng-content>
    </div>
  `
})
export class InlineEdit {
  @ContentChild(InlineEditInputRef) inputEditRef: InlineEditInputRef;

  constructor(public inlineEditor: InlineEditor) {
    inlineEditor.hasInlineEdit = true;
  }
}
