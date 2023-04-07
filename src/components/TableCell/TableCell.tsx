import { getNestedValue } from '@/helpers';
import { Link, TableCell as MuiTableCell } from '@mui/material';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import BooleanChip from '../BooleanChip/BooleanChip';
import Money from '../Money/Money';
import Progress from '../Progress/Progress';
import ProjectStatusChip from '../ProjectStatusChip/ProjectStatusChip';

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
        content = <Money currencyName={row.currency} value={value} />;
    } else if (column.type === 'progress') {
        content = <Progress value={value} />;
    } else if (column.type === 'projectStatus') {
        content = <ProjectStatusChip value={value} />;
    } else if (content === null || content === undefined) {
        content = <span>&nbsp;</span>;
    }

    return <MuiTableCell align={column.align}>
        {link ? (
            <Link component={NextLink} href={link}>
                {content}
            </Link>
        ) : content}
    </MuiTableCell>;

}