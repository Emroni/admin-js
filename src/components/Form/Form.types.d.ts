interface FormProps {
    children: ReactComponentElement<FormField>;
    initialValues?: IndexedObject?;
    loading?: boolean;
    title: string;
    onSubmit(data: IndexedObject): void;
}

interface FormField {
    label?: string;
    name: string;
}