import { getNestedValue } from '@/helpers';
import { Link, TableCell as MuiTableCell } from '@mui/material';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';

export default function TableCell({ column, row }: TableCellProps) {

    const [value, setValue] = useState<any>(null);

    useEffect(() => {
        // Get value
        let newValue = column.children || getNestedValue(row, column.name);

        // Check options
        const option = column.options?.find(option => option.value === newValue || option.id === newValue || option.name === newValue);
        if (option) {
            newValue = option.label || option.name || newValue;
        }

        // Check link
        if (column.getLink) {
            const href = typeof column.getLink === 'function' ? column.getLink(row) : column.getLink;
            newValue = <Link component={NextLink} href={href}>
                {newValue}
            </Link>;
        }

        setValue(newValue);
    }, [
        column,
        row,
    ]);

    return <MuiTableCell align={column.align}>
        {value || (
            <span>&nbsp;</span>
        )}
    </MuiTableCell>;

}