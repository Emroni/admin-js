import { getNestedValue } from '@/helpers';
import { capitalize, Link, TableCell, TableRow } from '@mui/material';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';

export default function SummaryField({ children, entity, label, name, getLink }: SummaryFieldProps) {

    const [value, setValue] = useState<any>(null);

    useEffect(() => {
        // Get value
        let value = children || (entity ? getNestedValue(entity, name) : null);

        // Check link
        if (getLink) {
            const href = typeof getLink === 'function' ? (entity && getLink(entity) || '') : getLink;
            value = <Link component={NextLink} href={href}>
                {value}
            </Link>;
        }

        setValue(value);
    }, [
        children,
        entity,
        getLink,
        name,
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