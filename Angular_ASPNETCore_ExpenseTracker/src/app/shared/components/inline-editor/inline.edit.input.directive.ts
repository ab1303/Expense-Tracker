import {
  HostListener,
  Directive,
  AfterViewChecked,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2
} from "@angular/core";
import { InlineEditor } from "./inline-editor.component";
import { Subscription } from "rxjs";
import { InternalEvent } from "./types/inline-editor-events.class";

@Directive({
  selector: "[inlineEditInputRef]"
})
export class InlineEditInputRef implements OnInit, OnDestroy, AfterViewChecked {
  private subscriptions: { [key: string]: Subscription } = {};

  constructor(public inlineEditor: InlineEditor,private renderer: Renderer2, private elRef: ElementRef) {}

  @HostListener("blur")
  onBlur() {
    this.inlineEditor.service.events.internal.onBlur.emit({
        event: null,
        state: this.inlineEditor.state.newState({
          ...this.inlineEditor.state.getState(),
          value: this.elRef.nativeElement.value,
        }),
    });
  }


  @HostListener("keyup.enter")
  @HostListener("keypress.enter")
  onEnter() {
    this.inlineEditor.service.events.internal.onEnter.emit({
        event: null,
        state: this.inlineEditor.state.newState({
          ...this.inlineEditor.state.getState(),
          value: this.elRef.nativeElement.value,
        }),
    });
  }


  
  @HostListener("keyup.escape")
  @HostListener("keypress.escape")
  onEscape() {
    this.inlineEditor.service.events.internal.onEscape.emit({
        event: null,
        state: this.inlineEditor.state,
    });
  }

  ngOnInit(): void {
    this.subscriptions.onEditSubscription = this.inlineEditor.service.events.internal.onEdit.subscribe(
      (intervalEvent: InternalEvent) => {
        this.renderer.setProperty(this.elRef.nativeElement, 'value', intervalEvent.state.getState().value);
      }
    );
  }

  ngOnDestroy(): void {
    (<any>Object).values(this.subscriptions).forEach(subscription =>
      subscription.unsubscribe()
    );
  }
  

  ngAfterViewChecked() {
    if (this.inlineEditor.state.isEditing()) {
      this.elRef.nativeElement.focus();
    }
  }
}
