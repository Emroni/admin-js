import { getNestedValue } from '@/helpers';
import { Link, TableCell as MuiTableCell } from '@mui/material';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import BooleanChip from '../BooleanChip/BooleanChip';
import Money from '../Money/Money';
import MoneyEnumeration from '../MoneyEnumeration/MoneyEnumeration';
import Progress from '../Progress/Progress';

export default function TableCell({ column, row }: TableCellProps) {

    const [link, setLink] = useState<string | undefined>(undefined);
    const [value, setValue] = useState<any>(null);

    useEffect(() => {
        // Get link
        const newLink = typeof column.getLink === 'function' ? (row && column.getLink(row) || '') : column.getLink;
        setLink(newLink);

        // Get value
        const newValue = getNestedValue(row, column.name);
        setValue(newValue);
    }, [
        column,
        row,
    ]);

    let content = value;
    if (column.children) {
        const Component: any = column.children;
        content = <Component column={column} row={row} value={value} />;
    } else if (column.type === 'boolean') {
        content = <BooleanChip value={value} />;
    } else if (column.type === 'money') {
        content = <Money amount={value} currencyName={row.currency} />;
    } else if (column.type === 'moneyEnumeration') {
        content = <MoneyEnumeration items={value} list />;
    } else if (column.type === 'progress') {
        content = <Progress value={value} />;
    }

    return <MuiTableCell align={column.align}>
        {(content && link) ? (
            <Link component={NextLink} href={link}>
                {content}
            </Link>
        ) : content}
    </MuiTableCell>;

}