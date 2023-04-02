type FormFieldType = 'date' | 'number' | 'text' | 'textarea' | 'time';

interface FormFieldProps {
    children?: ReactComponentElement<FormFieldChildProps>?;
    disabled?: boolean;
    label?: string;
    loading?: boolean;
    name: string;
    options?: EntityPropertyOption[];
    required?: boolean;
    type?: FormFieldType;
    onChange?(value: any, form: FormikContextType<IndexedObject>): void;
}

interface FormFieldChildProps {
    form: FormikContextType<IndexedObject>;
    name: string;
    value: any;
    setValue(value: any, shouldValidate?: boolean): void;
}