interface FormProps {
    children: ReactComponentElement<FormField>;
    initialValues?: IndexedObject?;
    loading?: boolean;
    title: string;
    onChange?(data: IndexedObject): void;
    onSubmit(data: IndexedObject): void;
}