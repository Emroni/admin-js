import { TableRow as MuiTableRow } from '@mui/material';
import { useRouter } from 'next/router';
import { CSSProperties, useEffect, useState } from 'react';
import TableCell from '../TableCell/TableCell';

export default function TableRow({ columns, row, getLink }: TableRowProps) {

    const [styles, setStyles] = useState<CSSProperties>({});
    const router = useRouter();

    useEffect(() => {
        const newStyles = {
            cursor: getLink ? 'pointer' : 'default',
        };
        setStyles(newStyles);
    }, [
        getLink,
    ]);

    function handleClick(e: React.MouseEvent) {
        // Check target
        const target = e.target as HTMLElement;
        if (!['a', 'button'].includes(target.nodeName.toLowerCase())) {
            e.preventDefault();

            // Open link
            const link = typeof getLink === 'function' ? getLink(row) : getLink;
            if (e.ctrlKey || e.metaKey || e.type === 'auxclick') {
                window.open(link);
            } else if (link) {
                router.push(link);
            }
        }
    }

    return <MuiTableRow hover sx={styles} onClick={handleClick}>
        {columns.map(column => (
            <TableCell column={column} key={column.name} row={row} />
        ))}
    </MuiTableRow>;

}