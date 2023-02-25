type FormFieldType = 'date' | 'number' | 'text' | 'textarea' | 'time';

interface FormFieldProps {
    disabled?: boolean;
    label?: string;
    loading?: boolean;
    name: string;
    options?: FormFieldOption[];
    required?: boolean;
    type?: FormFieldType;
}

interface FormFieldOption {
    label?: string;
    value?: number | string;
}