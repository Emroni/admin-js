import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Box, capitalize, Table as MuiTable, TableBody, TableCell, TableHead, TableRow as MuiTableRow } from '@mui/material';
import { Children, useEffect, useState } from 'react';
import Card from '../Card/Card';
import TableRow from '../TableRow/TableRow';

export default function Table({ action, children, order, rows, title, getRowLink, onOrderChange }: TableProps) {

    const [columns, setColumns] = useState<TableColumn[]>([]);

    useEffect(() => {
        // Get columns
        const newColumns: TableColumn[] = Children.map(children, child => child?.props)
            .filter((childProps: any) => childProps)
            .map((columnProps: TableColumn) => ({
                align: 'left',
                order: !columnProps.name.includes('.'), // TODO: Sort on relation
                label: capitalize(columnProps.name),
                ...columnProps,
            }));
        setColumns(newColumns);
    }, [
        children,
    ]);

    function handleOrderChange(column: TableColumn) {
        if (column.order && onOrderChange) {
            if (!order?.[column.name]) {
                // Set new order
                onOrderChange({
                    [column.name]: 'asc',
                });
            } else if (order[column.name] !== 'desc') {
                // Flip existing order
                onOrderChange({
                    [column.name]: 'desc',
                });
            } else {
                // Set default order
                onOrderChange(null);
            }
        }
    }

    return <Card action={action} loading={!rows} title={title}>
        <MuiTable>
            <TableHead>
                <MuiTableRow>
                    {columns.map((column, index) => (
                        <TableCell align={column.align} key={index} sx={{ cursor: column.order ? 'pointer' : 'default', userSelect: 'none' }} onClick={() => handleOrderChange(column)}>
                            {column.label}
                            {column.order && (
                                <Box display="inline-block" position="relative">
                                    <ArrowDropUp sx={{ left: 0, opacity: order?.[column.name] === 'asc' ? 1 : 0.3, position: 'absolute', top: -22, width: 20 }} />
                                    <ArrowDropDown sx={{ left: 0, opacity: order?.[column.name] === 'desc' ? 1 : 0.3, position: 'absolute', top: -12, width: 20 }} />
                                </Box>
                            )}
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