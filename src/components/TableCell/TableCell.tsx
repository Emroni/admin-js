import { getNestedValue } from '@/helpers';
import { Link, TableCell as MuiTableCell } from '@mui/material';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import Value from '../Value/Value';

export default function TableCell({ column, row }: TableCellProps) {

    const [link, setLink] = useState<string | undefined>(undefined);
    const [value, setValue] = useState<any>(null);

    useEffect(() => {
        // Get link
        const newLink = typeof column.getLink === 'function' ? (row && column.getLink(row) || '') : column.getLink;
        setLink(newLink);

        // Get value
        const newValue = column.children || getNestedValue(row, column.name);
        setValue(newValue);
    }, [
        column,
        row,
    ]);

    const content = <Value currency={row.currency} options={column.options} type={column.type} value={value} />;

    return <MuiTableCell align={column.align}>
        {link ? (
            <Link component={NextLink} href={link}>
                {content}
            </Link>
        ) : content}
    </MuiTableCell>;

}