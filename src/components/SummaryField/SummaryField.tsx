import { getLabel, getNestedValue } from '@/helpers';
import { Link, TableCell, TableRow } from '@mui/material';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import BooleanChip from '../BooleanChip/BooleanChip';
import Money from '../Money/Money';
import MoneyEnumeration from '../MoneyEnumeration/MoneyEnumeration';
import Progress from '../Progress/Progress';

export default function SummaryField({ children, currencyName, entity, label, name, options, type, getLink }: SummaryFieldProps) {

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


    let content = value;
    if (children) {
        const Component = children;
        content = <Component value={value} />;
    } else if (type === 'boolean') {
        content = <BooleanChip value={value} />;
    } else if (type === 'money') {
        content = <Money amount={value} currencyName={currencyName} />;
    } else if (type === 'moneyEnumeration') {
        content = <MoneyEnumeration items={value} />;
    } else if (type === 'progress') {
        content = <Progress value={value} />;
    }

    return <TableRow>
        <TableCell>
            {label || getLabel(name)}
        </TableCell>
        <TableCell>
            {(content && link) ? (
                <Link component={NextLink} href={link}>
                    {content}
                </Link>
            ) : content}
        </TableCell>
    </TableRow>;

}