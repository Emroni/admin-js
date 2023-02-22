import { TextField } from '@mui/material';
import { useField } from 'formik';

export default function FormField({ label, loading, name }: FormFieldProps) {

    const [field, _meta, helpers] = useField(name);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        helpers.setValue(e.target.value);
    }

    return <TextField disabled={loading} fullWidth label={label} name={name} value={field.value || ''} onChange={handleChange} />;

}