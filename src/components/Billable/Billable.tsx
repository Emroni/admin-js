import { Card, MoneyEnumeration } from '@/components';
import { getMinutesDuration, getUnique } from '@/helpers';
import { gql, useQuery } from '@apollo/client';
import { AccessTime, AccessTimeFilled } from '@mui/icons-material';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function Billable({ clientId }: BillableProps) {

    const [columns, setColumns] = useState<BillableColumn[]>([]);
    const [rows, setRows] = useState<BillableRow[]>([]);
    const [showHours, setShowHours] = useState(false);
    const [totalEarnings, setTotalEarnings] = useState<Money[]>([]);
    const [totalMinutes, setTotalMinutes] = useState<number>(0);

    const query = useQuery<TimesQuery>(gql`query($clientId: Int!) {
        times (filter: { clientId: $clientId, invoiceId: null }, order: "date asc", page: 0, perPage: 1000) {
            rows {
                currency
                date
                duration
                id
                earnings {
                    amount
                    currency
                }
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
            const newTotalEarningsMap: Map<CurrencyName, number> = new Map();

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

                // Add to total earnings
                time.earnings.forEach(earning => {
                    const amount = (newTotalEarningsMap.get(earning.currency) || 0) + earning.amount;
                    newTotalEarningsMap.set(earning.currency, amount);
                });
            });
            newRows.sort((a, b) => a.label < b.label ? -1 : 1);

            // Store values
            setColumns(newColumns);
            setRows(newRows);

            // Get total earnings
            const newTotalEarnings = Array.from(newTotalEarningsMap).map(([currency, amount]) => ({
                amount,
                currency,
            }));
            setTotalEarnings(newTotalEarnings);

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
        Billable <MoneyEnumeration items={totalEarnings} />
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