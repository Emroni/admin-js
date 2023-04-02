import { Box, Button } from '@mui/material';
import { useFormikContext } from 'formik';
import FormField from '../FormField/FormField';

export default function FormContent({ dirtyCheck = true, fields, loading }: FormContentProps) {

    const form = useFormikContext();

    return <>
        <Box display="flex" flexDirection="column" gap={3}>
            {fields.map(field => (
                <FormField key={field.name} loading={loading} {...field} />
            ))}
        </Box>
        <Box marginTop={3} textAlign="right">
            <Button disabled={dirtyCheck && (!form.dirty || loading)} type="submit">
                Save
            </Button>
        </Box>
    </>;

}