import { Form, Money, Value } from '@/components';
import { CURRENCIES } from '@/constants';
import { usePage } from '@/contexts/Page';
import { getSorted, getUnique } from '@/helpers';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Checkbox, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { FormikContextType } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function InvoiceAdd() {

    const [clients, setClients] = useState<Client[]>([]);
    const [initialValues, setInitialValues] = useState<IndexedObject>({});
    const router = useRouter();
    const page = usePage();

    const query = useQuery<InvoicesQuery & TimesQuery>(gql`query {
        invoices (order: "id desc", page: 0, perPage: 1) {
            rows {
                number
                type
            }
        }
        times (filter: { invoiceId: null }, order: "id asc", page: 0, perPage: 1000) {
            rows {
                currency
                date
                duration
                earnings
                id
                client {
                    id
                    name
                }
                project {
                    name
                }
                task {
                    name
                }
            }
        }
    }`);

    const [mutate, mutation] = useMutation(gql`mutation($input: InvoiceFields) {
        invoiceCreate (input: $input) {
            clientId
            id
            number
            currency
            amount
            type
            description
            sentDate
            paidDate
        }
    }`);

    useEffect(() => {
        if (query.data) {
            // Get clients
            const uniqueClients = getUnique(query.data.times.rows.map(time => time.client), 'id');
            const newClients = getSorted(uniqueClients, 'name');
            setClients(newClients);

            // Get client times
            const clientTimes = query.data.times.rows.filter(time => time.client.id === page.query.clientId);

            // Get initial values
            const prevInvoice = query.data.invoices.rows[0];
            const newInitialValues = {
                amount: clientTimes.reduce((total, time) => total + time.earnings, 0),
                currency: getUnique(clientTimes.map(row => row.currency))[0] || null,
                number: prevInvoice.number ? `${prevInvoice.number.slice(0, 3)}${parseInt(prevInvoice.number.slice(3)) + 1}` : undefined,
                sentDate: dayjs.utc().format('YYYY-MM-DD'),
                times: clientTimes.map(time => time.id),
                type: prevInvoice.type,
                ...page.query,
            };
            setInitialValues(newInitialValues);
        }
    }, [
        page.query,
        query.data,
    ]);

    function handleClientChange(clientId: any, form: FormikContextType<IndexedObject>) {
        if (query.data) {
            // Get client times
            const clientTimes = query.data.times.rows.filter(time => time.client.id === clientId);

            // Set times
            const times: any[] = clientTimes.map(time => time.id);
            form.setFieldValue('times', times);
            handleTimesChange(times, form);

            // Set currency
            const currency = getUnique(clientTimes.map(row => row.currency))[0] || null;
            form.setFieldValue('currency', currency);
        }
    }

    function handleTimeClick(time: Time, form: FormikContextType<IndexedObject>) {
        // Add or remove time from times
        const times = form.values.times.slice();
        const timeIndex = form.values.times.indexOf(time.id);
        if (timeIndex === -1) {
            times.push(time.id);
        } else {
            times.splice(timeIndex, 1);
        }
        form.setFieldValue('times', times);
        handleTimesChange(times, form);
    }

    function handleTimesChange(times: any, form: FormikContextType<IndexedObject>) {
        // Set amount
        const amount = query.data?.times.rows.filter(time => times.includes(time.id)).reduce((total, time) => total + time.earnings, 0);
        form.setFieldValue('amount', amount);
    }

    async function handleSubmit(values: IndexedObject) {
        const result = await mutate({
            variables: {
                input: values,
            },
        });
        mutation.client.clearStore();
        router.push(`/invoices/${result.data.invoiceCreate.id}`);
    }

    return <Form dirtyCheck={false} initialValues={initialValues} loading={!initialValues || !!mutation.data || mutation.loading} title="Add Invoice" onSubmit={handleSubmit}>
        <Form.Field name="number" />
        <Form.Field name="clientId" label="Client" options={clients} required onChange={handleClientChange} />
        <Form.Field name="type" required />
        <Form.Field name="currency" options={CURRENCIES} required />
        <Form.Field name="amount" type="number" required />
        <Form.Field name="sentDate" type="date" />
        <Form.Field name="paidDate" type="date" />
        <Form.Field name="times" onChange={handleTimesChange}>
            {({ form, value }: FormFieldChildProps) => (
                <Paper variant="outlined">
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>
                                    Task
                                </TableCell>
                                <TableCell align="right">
                                    Date
                                </TableCell>
                                <TableCell align="right">
                                    Duration
                                </TableCell>
                                <TableCell align="right">
                                    Earnings
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {query.data?.times.rows.filter(time => time.client.id === form.values.clientId).map(time => (
                                <TableRow key={time.id} onClick={() => handleTimeClick(time, form)}>
                                    <TableCell padding="none">
                                        <Checkbox checked={value.includes(time.id)} size="small" />
                                    </TableCell>
                                    <TableCell>
                                        {time.project.name} › {time.task.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Value value={time.date} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Value value={time.duration} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Money currencyName={time.currency} value={time.earnings} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </Form.Field>
    </Form>;

}