type FormFieldType = 'date' | 'number' | 'text' | 'textarea' | 'time';

interface FormFieldProps {
    disabled?: boolean;
    label?: string;
    loading?: boolean;
    name: string;
    options?: EntityPropertyOption[];
    required?: boolean;
    type?: FormFieldType;
}