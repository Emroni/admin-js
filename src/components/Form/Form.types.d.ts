interface FormProps {
    children: ReactComponentElement<FormField>;
    dirtyCheck?: boolean;
    initialValues?: IndexedObject?;
    loading?: boolean;
    title: string;
    onChange?(data: IndexedObject): void;
    onSubmit(data: IndexedObject): void;
}