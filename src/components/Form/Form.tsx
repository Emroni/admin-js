import { capitalize } from '@mui/material';
import { Form as FormikForm, Formik } from 'formik';
import { Children, useEffect, useState } from 'react';
import Card from '../Card/Card';
import FormContent from '../FormContent/FormContent';

export default function Form({ children, initialValues, loading, title, onSubmit }: FormProps) {

    const [fields, setFields] = useState<FormFieldProps[]>([]);

    useEffect(() => {
        // Get fields
        const newFields: FormFieldProps[] = Children.map(children, child => child?.props)
            .filter((childProps: any) => childProps)
            .map((fieldProps: FormField) => ({
                label: capitalize(fieldProps.name),
                ...fieldProps,
            }));
        setFields(newFields);
    }, [
        children,
    ]);

    function handleSubmit(values: IndexedObject) {
        // Parse values
        const data: IndexedObject = {};
        fields.forEach(field => {
            data[field.name] = values[field.name];
        });
        onSubmit(data);
    }

    return <Card loading={loading} title={title}>
        <Formik enableReinitialize initialValues={initialValues || {}} onSubmit={handleSubmit}>
            <FormikForm>
                <FormContent fields={fields} loading={loading} />
            </FormikForm>
        </Formik>
    </Card>;

}

const Field = (_: FormField) => null;
Form.Field = Field;