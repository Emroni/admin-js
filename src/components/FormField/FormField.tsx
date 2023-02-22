import { capitalize, TextField } from '@mui/material';
import { useField } from 'formik';

export default function FormField({ disabled, label, loading, name, required, type = 'text' }: FormFieldProps) {

    const [field, _meta, helpers] = useField(name);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        helpers.setValue(e.target.value);
    }

    return <TextField
        disabled={disabled || loading}
        fullWidth
        InputLabelProps={{ shrink: true }}
        label={label || capitalize(name)}
        multiline={type === 'textarea'}
        name={name}
        required={required}
        type={type}
        value={field.value || ''}
        onChange={handleChange}
    />;

}