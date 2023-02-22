import { Box, Button } from '@mui/material';
import { useFormikContext } from 'formik';
import FormField from '../FormField/FormField';

export default function FormContent({ fields, loading }: FormContentProps) {

    const formik = useFormikContext();

    return <>
        <Box display="flex" flexDirection="column" gap={3}>
            {fields.map((field, index) => (
                <FormField key={index} loading={loading} {...field} />
            ))}
        </Box>
        <Box marginTop={3} textAlign="right">
            <Button disabled={!formik.dirty || loading} type="submit">
                Save
            </Button>
        </Box>
    </>;

}