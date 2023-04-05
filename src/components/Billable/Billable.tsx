import { Card, Value } from '@/components';
import { getMinutesDuration, getUnique } from '@/helpers';
import { gql, useQuery } from '@apollo/client';
import { AccessTime, AccessTimeFilled } from '@mui/icons-material';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function Billable({ clientId }: BillableProps) {

    const [columns, setColumns] = useState<BillableColumn[]>([]);
    const [currency, setCurrency] = useState<string | undefined>(undefined);
    const [rows, setRows] = useState<BillableRow[]>([]);
    const [showHours, setShowHours] = useState(false);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [totalMinutes, setTotalMinutes] = useState<number>(0);

    const query = useQuery<TimesQuery>(gql`query($clientId: Int!) {
        times (filter: { clientId: $clientId, invoiceId: null }, order: "date asc", page: 0, perPage: 1000) {
            rows {
                currency
                date
                duration
                earnings
                id
                project {
                    id
                    name
                    status
                }
                task {
                    id
                    name
                }
            }
        }
    }`, {
        variables: {
            clientId,
        },
    });


    useEffect(() => {
        // Filter times
        const times = query.data?.times.rows.filter(time => time.project.status === 'in_progress');

        if (times?.length) {
            // Get currency
            const newCurrency = times[0].currency;
            setCurrency(newCurrency);

            // Parse dates
            const dates = times.map(time => time.date);
            const endDate = dayjs.utc(dates[dates.length - 1]);
            let startDate = dayjs.utc(dates[0]);

            // Get columns
            const newColumns: BillableColumn[] = [];
            while (startDate.isBefore(endDate) || startDate.isSame(endDate)) {
                newColumns.push({
                    day: startDate.format('DD MMM'),
                    minutes: 0,
                });
                startDate = startDate.add(1, 'day');
            }

            // Parse projects into rows
            const newRows: BillableRow[] = getUnique(times.map(time => time.project.name))
                .map(label => ({
                    label,
                    total: {
                        day: 'Total',
                        minutes: 0,
                    },
                    values: newColumns.map(column => ({
                        day: column.day,
                        minutes: 0,
                    })),
                }));

            // Parse times into rows
            times.forEach(time => {
                // Get items
                const day = dayjs.utc(time.date).format('DD MMM');
                const column = newColumns.find(column => column.day === day) as BillableColumn;
                const row = newRows.find(row => row.label === time.project.name) as BillableRow;
                const value = row.values.find(value => value.day === day) as BillableValue;

                // Add duration
                const [hours, minutes] = time.duration.split(':').map(n => parseInt(n));
                const min = 60 * hours + minutes;
                column.minutes += min;
                row.total.minutes += min;
                value.minutes += min;
            });
            newRows.sort((a, b) => a.label < b.label ? -1 : 1);

            // Store values
            setColumns(newColumns);
            setRows(newRows);

            // Get total amount
            const newTotalAmount = times.reduce((total, time) => total + time.earnings, 0);
            setTotalAmount(newTotalAmount);

            // Get total minutes
            const newTotalMinutes = newColumns.reduce((total, column) => total + column.minutes, 0);
            setTotalMinutes(newTotalMinutes);
        }
    }, [
        query.data,
    ]);

    function getValue(minutes: number) {
        if (showHours) {
            return Math.round(minutes / 60 * 100000) / 100000;
        }
        return getMinutesDuration(minutes);
    }

    const action = <>
        <IconButton onClick={() => setShowHours(!showHours)}>
            {showHours ? (
                <AccessTimeFilled />
            ) : (
                <AccessTime />
            )}
        </IconButton>
    </>;

    const title = <>
        Billable <Value currency={currency} value={totalAmount} type="money" />
    </>;

    return <Card action={action} loading={query.loading} title={title}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Project
                    </TableCell>
                    {columns.map(column => (
                        <TableCell align="right" key={column.day}>
                            {column.day}
                        </TableCell>
                    ))}
                    <TableCell align="right">
                        Total
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, r) => (
                    <TableRow key={r}>
                        <TableCell>
                            {row.label}
                        </TableCell>
                        {row.values.map((value, v) => (
                            <TableCell align="right" key={v}>
                                {getValue(value.minutes)}
                            </TableCell>
                        ))}
                        <TableCell align="right">
                            {getValue(row.total.minutes)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableHead>
                <TableRow>
                    <TableCell>
                        All
                    </TableCell>
                    {columns.map(column => (
                        <TableCell align="right" key={column.day}>
                            {getValue(column.minutes)}
                        </TableCell>
                    ))}
                    <TableCell align="right">
                        {getValue(totalMinutes)}
                    </TableCell>
                </TableRow>
            </TableHead>
        </Table>
    </Card>

}