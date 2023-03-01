import { capitalize, MenuItem, TextField } from '@mui/material';
import { useField } from 'formik';

export default function FormField({ disabled, label, loading, name, options, required, type = 'text' }: FormFieldProps) {

    const [field, _meta, helpers] = useField(name);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let value: any = e.target.value;
        if (type === 'number') {
            value = parseFloat(value);
        }
        helpers.setValue(value);
    }

    return <TextField
        disabled={disabled || loading}
        fullWidth
        InputLabelProps={{ shrink: true }}
        label={label || capitalize(name)}
        multiline={type === 'textarea'}
        name={name}
        required={required}
        select={!!options}
        type={type}
        value={(field.value !== null && field.value !== undefined) ? field.value : ''}
        onChange={handleChange}
    >
        {options?.map((option, index) => (
            <MenuItem key={index} value={option.value || option.id || option.name}>
                {option.label || option.name || option.value}
            </MenuItem>
        ))}
    </TextField>;

}