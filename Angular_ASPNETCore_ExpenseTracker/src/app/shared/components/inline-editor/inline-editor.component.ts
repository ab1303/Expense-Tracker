
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, forwardRef } from "@angular/core";

import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator } from "@angular/forms";

import { InternalEvents, ExternalEvents, Events, InlineEditorEvent, ExternalEvent, InternalEvent } from "./types/inline-editor-events.class";
import { InlineConfig } from "./types/inline-configs";
import { InlineEditorState } from "./types/inline-editor-state.class";
import { InlineEditorService } from "./inline-editor.service";
import { InputConfig } from "./types/input-configs";
import { Subscription } from "rxjs";

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
    templateUrl: './inline-editor.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InlineEditor),
            multi: true,
        },
        // {
        //     provide: NG_VALIDATORS,
        //     useExisting: forwardRef(() => InlineEditor),
        //     multi: true,
        // },
    ],
})
export class InlineEditor implements OnInit, OnDestroy, ControlValueAccessor {
    public events: Events = {
        internal: new InternalEvents(),
        external: new ExternalEvents(),
    };

    private refreshNGModel: (_: any) => void;
    private isEnterKeyPressed = false;
    private subscriptions: { [key: string]: Subscription } = {};

    public service: InlineEditorService;
    public state: InlineEditorState;

    isEditing: boolean = false;
    hasInlineEdit: boolean = false;
    hasInlineDisplay: boolean = false;


    @Input() label: string;
    @Input() public config: InlineConfig;
    @Output() public onChange: EventEmitter<InlineEditorEvent | any> = this.events.external.onChange;
    @Output() public onSave: EventEmitter<InlineEditorEvent | any> = this.events.external.onSave;
    @Output() public onEdit: EventEmitter<InlineEditorEvent | any> = this.events.external.onEdit;
    @Output() public onEnter: EventEmitter<InlineEditorEvent | any> = this.events.external.onEnter;
    @Output() public onEscape: EventEmitter<InlineEditorEvent | any> = this.events.external.onEscape;
    @Output() public onKeyPress: EventEmitter<InlineEditorEvent | any> = this.events.external.onKeyPress;
    @Output() public onFocus: EventEmitter<InlineEditorEvent | any> = this.events.external.onFocus;
    @Output() public onBlur: EventEmitter<InlineEditorEvent | any> = this.events.external.onBlur;

    public editMode() {
        this.isEditing = true;
    }

    public normalMode() {
        this.isEditing = false;
    }

    private _saveOnBlur?: boolean;
    @Input() public set saveOnBlur(saveOnBlur: boolean | undefined) {
        this._saveOnBlur = saveOnBlur;
        this.updateConfig(undefined, "saveOnBlur", saveOnBlur);
    }
    public get saveOnBlur(): boolean | undefined {
        return this._saveOnBlur;
    }

    private _saveOnEnter?: boolean;
    @Input() public set saveOnEnter(saveOnEnter: boolean | undefined) {
        this._saveOnEnter = saveOnEnter;
        this.updateConfig(undefined, "saveOnEnter", saveOnEnter);
    }

    public get saveOnEnter(): boolean | undefined {
        return this._saveOnEnter;
    }

    private _saveOnChange?: boolean;
    @Input() public set saveOnChange(saveOnChange: boolean | undefined) {
        this._saveOnChange = saveOnChange;
        this.updateConfig(undefined, "saveOnChange", saveOnChange);
    }
    public get saveOnChange(): boolean | undefined {
        return this._saveOnChange;
    }

    private _editOnClick?: boolean;
    @Input() public set editOnClick(editOnClick: boolean | undefined) {
        this._editOnClick = editOnClick;
        this.updateConfig(undefined, "editOnClick", editOnClick);
    }

    public get editOnClick(): boolean | undefined {
        return this._editOnClick;
    }

    private _cancelOnEscape?: boolean;
    @Input() public set cancelOnEscape(cancelOnEscape: boolean | undefined) {
        this._cancelOnEscape = cancelOnEscape;
        this.updateConfig(undefined, "cancelOnEscape", cancelOnEscape);
    }

    public get cancelOnEscape(): boolean | undefined {
        return this._cancelOnEscape;
    }

    private _disabled?: boolean;
    @Input() public set disabled(disabled: boolean | undefined) {
        this._disabled = disabled;
        this.updateConfig(undefined, "disabled", disabled);
    }

    public get disabled(): boolean | undefined {
        return this._disabled;
    }

    private _required?: boolean;
    @Input() public set required(required: boolean | undefined) {
        this._required = required;
        this.updateConfig(undefined, "required", required);
    }

    public get required(): boolean | undefined {
        return this._required;
    }

    private _onlyValue?: boolean;
    @Input() public set onlyValue(onlyValue: boolean | undefined) {
        this._onlyValue = onlyValue;
        this.updateConfig(undefined, "onlyValue", onlyValue);
    }

    public get onlyValue(): boolean | undefined {
        return this._onlyValue;
    }

    private _placeholder?: string;
    @Input() public set placeholder(placeholder: string | undefined) {
        this._placeholder = placeholder;
        this.updateConfig(undefined, "placeholder", placeholder);
    }

    public get placeholder(): string | undefined {
        return this._placeholder;
    }

    private _name?: string;
    @Input() public set name(name: string | undefined) {
        this._name = name;
        this.updateConfig(undefined, "name", name);
    }

    public get name(): string | undefined {
        return this._name;
    }

    // input's attribute
    private _empty?: string;
    @Input() public set empty(empty: string | undefined) {
        this._empty = empty;
        this.updateConfig(undefined, "empty", empty);
    }

    public get empty(): string | undefined {
        return this._empty;
    }


    ngOnInit(): void {
        this.config = this.generateSafeConfig();

        this.state = new InlineEditorState({
            disabled: this.config.disabled,
            value: "",
        });

        this.service = new InlineEditorService(this.events, { ...this.config });

        this.subscriptions.onUpdateStateSubcription = this.events.internal.onUpdateStateOfParent.subscribe(
            (state: InlineEditorState) => this.state = state,
        );

        this.subscriptions.onSaveSubscription = this.events.internal.onSave.subscribe(
            ({ event, state }: InternalEvent) => this.save({
                event,
                state: state.getState(),
            }),
        );

        this.subscriptions.onKeyPressSubcription = this.events.internal.onKeyPress.subscribe(
            ({ event, state }: InternalEvent) => this.emit(this.onKeyPress, {
                event,
                state: state.getState(),
            }),
        );


        this.subscriptions.onBlurSubscription = this.events.internal.onBlur.subscribe(
            ({ event, state }: InternalEvent) => {
                // TODO (xxxtonixx): Maybe, this approach is not the best,
                // because we need to set a class property and it is dangerous.
                // We should search for one better.
                const isSavedByEnterKey = this.isEnterKeyPressed && this.config.saveOnEnter;

                if (this.config.saveOnBlur && !isSavedByEnterKey) {
                    this.saveAndClose({
                        event,
                        state: state.getState(),
                    });
                }

                this.isEnterKeyPressed = false;

                this.emit(this.onBlur, {
                    event,
                    state: state.getState(),
                });
            },
        );


        this.subscriptions.onFocusSubcription = this.events.internal.onFocus.subscribe(
            ({ event, state }: InternalEvent) => this.emit(this.onFocus, {
                event,
                state: state.getState(),
            }),
        );

        this.subscriptions.onEnterSubscription = this.events.internal.onEnter.subscribe(
            ({ event, state }: InternalEvent) => {
                this.isEnterKeyPressed = true;

                if (this.config.saveOnEnter) {
                    this.save({
                        event,
                        state: state.getState(),
                    });

                    this.edit({ editing: false });
                }

                this.emit(this.onEnter, {
                    event,
                    state: state.getState(),
                });
            },
        );

        this.subscriptions.onEscapeSubscription = this.events.internal.onEscape.subscribe(
            ({ event, state }: InternalEvent) => {
                this.emit(this.onEscape, {
                    event,
                    state: state.getState(),
                });
            },
        );
    }

    ngOnDestroy(): void {
        Object.values(this.subscriptions).forEach(subscription => subscription.unsubscribe());
        this.service.destroy();
    }

    writeValue(value: any) {
        this.state = this.state.newState({
            ...this.state.getState(),
            value,
        });

        this.events.internal.onUpdateStateOfChild.emit(this.state.clone());
    }

    registerOnChange(refreshNGModel: (_: any) => void) {
        this.refreshNGModel = refreshNGModel;
    }

    registerOnTouched() { }

    public edit({ editing = true, event }: { editing?: boolean, event?: any } = {}) {
        this.state = this.state.newState({
            ...this.state.getState(),
            editing,
        });

        this.events.internal.onUpdateStateOfChild.emit(this.state.clone());

        if (editing) {
            this.emit(this.onEdit, {
                event,
                state: this.state.getState(),
            });
        }
    }

    public save({ event, state: hotState }: ExternalEvent) {
        const prevState = this.state.getState();

        const state = {
            ...prevState,
            ...hotState,
        };

        this.state = this.state.newState(state);

        this.refreshNGModel(state.value);

        this.emit(this.onSave, {
            event,
            state,
        });
    }


    public saveAndClose(outsideEvent: ExternalEvent) {
        this.save(outsideEvent);

        this.edit({ editing: false });
    }


    private removeUndefinedProperties<T>(object: Object): T {
        return JSON.parse(
            JSON.stringify(
                typeof object === "object" ? object : {},
            ),
        );
    }

    private generateSafeConfig(): InlineConfig {
        const configFromAttrs: InlineConfig = {
            name: this.name!,
            placeholder: this.placeholder!,
            empty: this.empty!,
            required: this.required!,
            disabled: this.disabled!,
            saveOnEnter: this.saveOnEnter!,
            saveOnBlur: this.saveOnBlur!,
            saveOnChange: this.saveOnChange!,
            editOnClick: this.editOnClick!,
            cancelOnEscape: this.cancelOnEscape!,
            onlyValue: this.onlyValue!,
        };

        return {
            // First default config
            ...defaultConfig,
            // Default config is overwritten by [config] attr
            ...this.removeUndefinedProperties<InlineConfig>(this.config),
            // Config from attributes have preference over all others
            ...this.removeUndefinedProperties<InlineConfig>(configFromAttrs),
        };
    }

    private updateConfig(config?: InlineConfig, property?: string, value?: any) {
        if (this.config) {
            config = config || this.config;

            if (property) {
                config[property] = value;
            }

            this.config = { ...config };

            this.events.internal.onUpdateConfig.emit(this.config);
        }
    }


    private emit(event: EventEmitter<InlineEditorEvent | any>, data: ExternalEvent) {
        if (this.config.onlyValue) {
            event.emit(data.state.value);
        } else {
            (event as EventEmitter<InlineEditorEvent>)
                .emit({
                    ...data,
                    instance: this,
                });
        }
    }

}
