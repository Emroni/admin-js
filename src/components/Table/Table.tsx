import { clamp } from '@/helpers';
import { ArrowDropDown, ArrowDropUp, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, capitalize, IconButton, MenuItem, Select, Table as MuiTable, TableBody, TableCell, TableFooter, TableHead, TableRow as MuiTableRow } from '@mui/material';
import { Children, useEffect, useState } from 'react';
import Card from '../Card/Card';
import TableRow from '../TableRow/TableRow';

export default function Table({ action, children, data, title, getRowLink, onOrderChange, onPageChange, onPerPageChange }: TableProps) {

    const [columns, setColumns] = useState<TableColumn[]>([]);
    const [loadedRows, setLoadedRows] = useState<IndexedObject[]>([]);

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

    useEffect(() => {
        // Get loaded rows
        if (data) {
            setLoadedRows(data.rows);
        }
    }, [
        data,
    ]);

    function handleOrderChange(column: TableColumn) {
        if (data && column.order && onOrderChange) {
            switch (data.order) {
                case `${column.name} asc`: onOrderChange(`${column.name} desc`); break;
                case `${column.name} desc`: onOrderChange(null); break;
                default: onOrderChange(`${column.name} asc`); break;
            }
        }
    }

    const page = data?.page || 0;
    const perPage = data?.perPage || 10;
    const total = data?.total || 0;
    const pages = Math.ceil(total / perPage) || 1;
    const start = perPage * page + 1;
    const end = (start || 1) + loadedRows.length - 1;

    return <Card action={action} loading={!data} title={title}>
        <MuiTable>
            <TableHead>
                <MuiTableRow>
                    {columns.map((column, index) => (
                        <TableCell align={column.align} key={index} sx={{ cursor: column.order ? 'pointer' : 'default', userSelect: 'none' }} onClick={() => handleOrderChange(column)}>
                            {column.label}
                            {column.order && (
                                <Box display="inline-block" position="relative">
                                    <ArrowDropUp sx={{ left: 0, opacity: data?.order === `${column.name} asc` ? 1 : 0.3, position: 'absolute', top: -22, width: 20 }} />
                                    <ArrowDropDown sx={{ left: 0, opacity: data?.order === `${column.name} desc` ? 1 : 0.3, position: 'absolute', top: -12, width: 20 }} />
                                </Box>
                            )}
                        </TableCell>
                    ))}
                </MuiTableRow>
            </TableHead>
            <TableBody>
                {loadedRows.map((row, r) => (
                    <TableRow columns={columns} key={r} row={row} getLink={getRowLink} />
                ))}
            </TableBody>
            <TableFooter>
                <MuiTableRow>
                    <TableCell>
                        <Box whiteSpace="nowrap">
                            {start} - {end} / {total || 0}
                        </Box>
                    </TableCell>
                    <TableCell align="right" colSpan={columns.length - 1}>
                        <Box whiteSpace="nowrap">
                            <Select value={perPage || 10} onChange={e => onPerPageChange?.(Number(e.target.value))} >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                                <MenuItem value={1000}>1000</MenuItem>
                            </Select>
                            <IconButton disabled={!page} type="button" onClick={() => onPageChange?.(clamp(page - 1, 0, pages - 1))}>
                                <ChevronLeft />
                            </IconButton>
                            {page + 1} / {pages}
                            <IconButton disabled={page === pages - 1} type="button" onClick={() => onPageChange?.(clamp(page + 1, 0, pages - 1))} >
                                <ChevronRight />
                            </IconButton>
                        </Box>
                    </TableCell>
                </MuiTableRow>
            </TableFooter>
        </MuiTable>
    </Card>;

}

const TableColumn = (_: TableColumn) => null;
Table.Column = TableColumn;