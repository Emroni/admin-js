import { capitalize, Table as MuiTable, TableBody, TableCell, TableHead, TableRow as MuiTableRow } from '@mui/material';
import { Children, useEffect, useState } from 'react';
import Card from '../Card/Card';
import TableRow from '../TableRow/TableRow';

export default function Table({ action, children, rows, title, getRowLink }: TableProps) {

    const [columns, setColumns] = useState<TableColumn[]>([]);

    useEffect(() => {
        // Get columns
        const newColumns: TableColumn[] = Children.map(children, child => child?.props)
            .filter((childProps: any) => childProps)
            .map((columnProps: TableColumn) => ({
                align: 'left',
                label: capitalize(columnProps.name),
                ...columnProps,
            }));
        setColumns(newColumns);
    }, [
        children,
    ]);

    return <Card action={action} loading={!rows} title={title}>
        <MuiTable>
            <TableHead>
                <MuiTableRow>
                    {columns.map((column, index) => (
                        <TableCell align={column.align} key={index}>
                            {column.label}
                        </TableCell>
                    ))}
                </MuiTableRow>
            </TableHead>
            <TableBody>
                {rows?.map((row, r) => (
                    <TableRow columns={columns} key={r} row={row} getLink={getRowLink} />
                ))}
            </TableBody>
        </MuiTable>
    </Card>;

}

const TableColumn = (_: TableColumn) => null;
Table.Column = TableColumn;