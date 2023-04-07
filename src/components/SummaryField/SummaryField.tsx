import { getLabel, getNestedValue } from '@/helpers';
import { Link, TableCell, TableRow } from '@mui/material';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import BooleanChip from '../BooleanChip/BooleanChip';
import Value from '../Value/Value';

export default function SummaryField({ children, currency, entity, label, name, options, type, getLink }: SummaryFieldProps) {

    const [link, setLink] = useState<string | undefined>(undefined);
    const [value, setValue] = useState<any>(null);

    useEffect(() => {
        // Get link
        const newLink = typeof getLink === 'function' ? (entity && getLink(entity) || '') : getLink;
        setLink(newLink);

        // Get value
        const newValue = entity ? getNestedValue(entity, name) : null;
        setValue(newValue);
    }, [
        entity,
        name,
        getLink,
    ]);


    let content: any = null;
    if (children) {
        const Component = children;
        content = <Component value={value} />;
    } else if (type === 'projectStatus') {
        content = <ProjectStatusChip value={value} />;
    } else {
        content = <Value currency={currency} options={options} type={type} value={value} />;
    }

    return <TableRow>
        <TableCell>
            {label || getLabel(name)}
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