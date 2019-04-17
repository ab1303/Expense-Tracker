
export interface InlineBaseConfig  {
    name?: string;
    placeholder: string;
    empty: string;
    hideButtons?: boolean;
    required?: boolean;
    disabled?: boolean;
    onlyValue?: boolean;
}



export interface InlineConfig extends InlineBaseConfig {
    required: boolean;
    disabled: boolean;
    cancelOnEscape: boolean;
    editOnClick: boolean;
    onlyValue: boolean;
}
