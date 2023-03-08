import { getNestedValue } from '@/helpers';
import { TableCell as MuiTableCell } from '@mui/material';
import { useEffect, useState } from 'react';
import Value from '../Value/Value';

export default function TableCell({ column, row }: TableCellProps) {

    const [value, setValue] = useState<any>(null);

    useEffect(() => {
        // Get value
        const newValue = column.children || getNestedValue(row, column.name);
        setValue(newValue);
    }, [
        column,
        row,
    ]);

    return <MuiTableCell align={column.align}>
        <Value entity={row} options={column.options} type={column.type} value={value} getLink={column.getLink} />
    </MuiTableCell>;

}