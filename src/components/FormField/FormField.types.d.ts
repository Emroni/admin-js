type FormFieldType = 'date' | 'number' | 'text' | 'textarea' | 'time';

interface FormFieldProps {
    disabled?: boolean;
    label?: string;
    loading?: boolean;
    name: string;
    required?: boolean;
    type?: FormFieldType;
}