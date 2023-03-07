import { getNestedValue, hoursToTime } from '@/helpers';
import { capitalize, Link, TableCell, TableRow } from '@mui/material';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';

export default function SummaryField({ children, entity, label, name, options, type, getLink }: SummaryFieldProps) {

    const [value, setValue] = useState<any>(null);

    useEffect(() => {
        // Get value
        let newValue = children || (entity ? getNestedValue(entity, name) : null);

        // Check hours
        if (type === 'hours') {
            newValue = hoursToTime(newValue);
        }

        // Check array
        if (Array.isArray(newValue)) {
            newValue = newValue.length;
        }

        // Check options
        if (options) {
            const option = options.find(option => option.value === newValue || option.id === newValue || option.name === newValue);
            if (option) {
                newValue = option.label || option.name || newValue;
            }
        }

        // Check link
        if (getLink) {
            const href = typeof getLink === 'function' ? (entity && getLink(entity) || '') : getLink;
            newValue = <Link component={NextLink} href={href}>
                {newValue}
            </Link>;
        }

        setValue(newValue);
    }, [
        children,
        entity,
        getLink,
        name,
        options,
        type,
    ]);

    return <TableRow>
        <TableCell>
            {label || capitalize(name)}
        </TableCell>
        <TableCell>
            {value}
        </TableCell>
    </TableRow>;

}