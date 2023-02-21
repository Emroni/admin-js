import { getNestedValue } from '@/helpers/data';
import { capitalize, Link, Table as MuiTable, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import NextLink from 'next/link';
import { Children, useEffect, useState } from 'react';
import Card from '../Card/Card';

export default function Table({ children, rows, title }: TableProps) {

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

    return <Card loading={!rows} title={title}>
        <MuiTable>
            <TableHead>
                <TableRow>
                    {columns.map((column, index) => (
                        <TableCell align={column.align} key={index}>
                            {column.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows?.map((row, r) => (
                    <TableRow hover key={r}>
                        {columns.map((column, c) => {
                            // Get value
                            let value = column.children || getNestedValue(row, column.name);

                            // Check link
                            if (column.getLink) {
                                const href = typeof column.getLink === 'function' ? column.getLink(row) : column.getLink;
                                value = <Link component={NextLink} href={href}>
                                    {value}
                                </Link>;
                            }

                            // Return cell
                            return <TableCell align={column.align} key={c}>
                                {value}
                            </TableCell>;
                        })}
                    </TableRow>
                ))}
            </TableBody>
        </MuiTable>
    </Card >;

}

const TableColumn = (_: TableColumn) => null;
Table.Column = TableColumn;