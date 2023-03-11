import { getNestedValue } from '@/helpers';
import { capitalize, Link, TableCell, TableRow } from '@mui/material';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import Value from '../Value/Value';

export default function SummaryField({ children, currency, entity, label, name, options, type, getLink }: SummaryFieldProps) {

    const [link, setLink] = useState<string | undefined>(undefined);
    const [value, setValue] = useState<any>(null);

    useEffect(() => {
        // Get link
        const newLink = typeof getLink === 'function' ? (entity && getLink(entity) || '') : getLink;
        setLink(newLink);

        // Get value
        const newValue = children || (entity ? getNestedValue(entity, name) : null);
        setValue(newValue);
    }, [
        children,
        entity,
        name,
        getLink,
    ]);

    const content = <Value currency={currency} options={options} type={type} value={value} />;

    return <TableRow>
        <TableCell>
            {label || capitalize(name)}
        </TableCell>
        <TableCell>
            {link ? (
                <Link component={NextLink} href={link}>
                    {content}
                </Link>
            ) : content}
        </TableCell>
    </TableRow>;

}