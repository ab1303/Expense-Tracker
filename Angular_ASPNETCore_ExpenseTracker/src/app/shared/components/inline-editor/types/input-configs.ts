
export interface InlineActionsOnEvents {
    saveOnChange?: boolean;
    saveOnBlur?: boolean;
    saveOnEnter?: boolean;
    cancelOnEscape?: boolean;
    editOnClick?: boolean;
}

export interface InputBaseConfig extends InlineActionsOnEvents {
    name?: string;
    size?: number;
    placeholder?: string;
    empty?: string;
    hideButtons?: boolean;
    required?: boolean;
    disabled?: boolean;
    onlyValue?: boolean;
}

export interface InputConfig extends
    InputBaseConfig
    { }
