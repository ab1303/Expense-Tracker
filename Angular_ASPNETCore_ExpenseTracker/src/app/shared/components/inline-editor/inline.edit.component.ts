import { Component, ContentChildren, ContentChild, OnInit, OnDestroy } from "@angular/core";
import { InlineEditor } from "./inline-editor.component";
import { InlineEditInputRef } from "./inline.edit.input.directive";
import { Subscription } from "rxjs";
import { InternalEvents, ExternalEvents, Events, InternalEvent } from "./types/inline-editor-events.class";
import { InlineEditorState } from "./types/inline-editor-state.class";

@Component({
  selector: "inline-edit",
  template: `
    <div>
      <ng-content *ngIf="inlineEditor.state.isEditing()"></ng-content>
    </div>
  `
})
export class InlineEdit  {
 

  @ContentChild(InlineEditInputRef) inputEditRef: InlineEditInputRef;

  constructor(public inlineEditor: InlineEditor) {
    inlineEditor.hasInlineEdit = true;
  }

}
