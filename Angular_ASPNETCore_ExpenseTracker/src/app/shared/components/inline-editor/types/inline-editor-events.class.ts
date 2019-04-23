import { EventEmitter } from "@angular/core";
import { InlineConfig } from "../types/inline-configs";
import { InlineEditorState, InlineEditorStateOptions } from "./inline-editor-state.class";
import { InlineEditor } from "../inline-editor.component";

export interface Events {
    internal: InternalEvents;
    external: ExternalEvents;
}

export class InternalEvents {
    public onUpdateStateOfParent: EventEmitter<InlineEditorState> = new EventEmitter();
    public onUpdateStateOfChild: EventEmitter<InlineEditorState> = new EventEmitter();
    public onChange: EventEmitter<InternalEvent> = new EventEmitter();
    public onFocus: EventEmitter<InternalEvent> = new EventEmitter();
    public onBlur: EventEmitter<InternalEvent> = new EventEmitter();
    public onKeyPress: EventEmitter<InternalEvent> = new EventEmitter();
    public onEnter: EventEmitter<InternalEvent> = new EventEmitter();
    public onEscape: EventEmitter<InternalEvent> = new EventEmitter();
    public onEdit: EventEmitter<InternalEvent> = new EventEmitter();
    public onUpdateConfig: EventEmitter<InlineConfig> = new EventEmitter();
}

export class ExternalEvents {
    public onChange: EventEmitter<InlineEditorEvent> = new EventEmitter();
    public onFocus: EventEmitter<InlineEditorEvent> = new EventEmitter();
    public onBlur: EventEmitter<InlineEditorEvent> = new EventEmitter();
    public onKeyPress: EventEmitter<InlineEditorEvent> = new EventEmitter();
    public onEnter: EventEmitter<InlineEditorEvent> = new EventEmitter();
    public onEscape: EventEmitter<InlineEditorEvent> = new EventEmitter();
    public onEdit: EventEmitter<InlineEditorEvent> = new EventEmitter();
}

export interface InternalEvent {
    event?: Event;
    state: InlineEditorState;
}

export interface ExternalEvent {
    event?: Event;
    state: InlineEditorStateOptions;
}

export interface InlineEditorEvent extends ExternalEvent {
    instance: InlineEditor;
}