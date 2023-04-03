import { capitalize, FormControlLabel, MenuItem, Switch, TextField } from '@mui/material';
import { useField, useFormikContext } from 'formik';

export default function FormField({ children, disabled, label, loading, name, options, required, type = 'text', onChange }: FormFieldProps) {

    const [field, _meta, helpers] = useField(name);
    const form = useFormikContext();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let value: any = e.target.value;
        if (type === 'number') {
            value = parseFloat(value);
        }
        helpers.setValue(value);
        onChange?.(value, form);
    }

    const parsedLabel = label || capitalize(name);
    const value = (field.value !== null && field.value !== undefined && (!options || options.length)) ? field.value : '';

    if (children) {
        const Component: any = children;
        return <Component form={form} name={name} value={value} setValue={helpers.setValue} />;
    }

    if (type === 'switch') {
        return <FormControlLabel label={parsedLabel} control={
            <Switch checked={!!value} name={name} onClick={() => helpers.setValue(!value)} />
        } />
    }

    return <TextField
        disabled={disabled || loading}
        fullWidth
        InputLabelProps={{ shrink: true }}
        label={parsedLabel}
        multiline={type === 'textarea'}
        name={name}
        required={required}
        select={!!options}
        type={type}
        value={value}
        onChange={handleChange}
    >
        {options?.map((option, index) => (
            <MenuItem key={option.id || option.name || option.value || index} value={option.value || option.id || option.name}>
                {option.label || option.name || option.value}
            </MenuItem>
        ))}
    </TextField>;

}