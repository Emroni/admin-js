import { getNestedValue } from '@/helpers';
import { capitalize, TableCell, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import Value from '../Value/Value';

export default function SummaryField({ children, currency, entity, label, name, options, type, getLink }: SummaryFieldProps) {

    const [value, setValue] = useState<any>(null);

    useEffect(() => {
        // Get value
        const newValue = children || (entity ? getNestedValue(entity, name) : null);
        setValue(newValue);
    }, [
        children,
        entity,
        name,
    ]);

    return <TableRow>
        <TableCell>
            {label || capitalize(name)}
        </TableCell>
        <TableCell>
            <Value currency={currency} entity={entity} options={options} type={type} value={value} getLink={getLink} />
        </TableCell>
    </TableRow>;

}