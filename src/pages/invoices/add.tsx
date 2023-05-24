import { Form, MoneyEnumeration } from '@/components';
import { CURRENCIES } from '@/constants';
import { usePage } from '@/contexts/Page/Page';
import { getSorted, getUnique } from '@/helpers';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Checkbox, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function InvoiceAdd() {

    const [clients, setClients] = useState<Client[]>([]);
    const [currencies, setCurrencies] = useState<Currency[]>(CURRENCIES);
    const [initialValues, setInitialValues] = useState<Partial<InvoiceFields>>({});
    const [times, setTimes] = useState<Time[]>([]);
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
                id
                client {
                    id
                    name
                }
                earnings {
                    amount
                    currency
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
            id
        }
    }`);

    useEffect(() => {
        if (query.data) {
            // Get clients
            const uniqueClients = getUnique(query.data.times.rows.map(time => time.client), 'id');
            const newClients = getSorted(uniqueClients, 'name');
            setClients(newClients);

            // Get initial values
            const prevInvoice = query.data.invoices.rows[0];
            const newInitialValues: Partial<InvoiceFields> = {
                clientId: page.query.clientId,
                number: prevInvoice.number ? `${prevInvoice.number.slice(0, 3)}${parseInt(prevInvoice.number.slice(3)) + 1}` : undefined,
                sentDate: dayjs.utc().format('YYYY-MM-DD'),
                type: prevInvoice.type,
            };
            setInitialValues(newInitialValues);
        }
    }, [
        page.query,
        query.data,
    ]);

    useEffect(() => {
        if (query.data && initialValues.clientId && initialValues.currency === undefined) {
            // Get currency
            const clientTimes = query.data.times.rows.filter(time => time.client.id === initialValues.clientId) || [];
            const currencyNames = getUnique(clientTimes.map(row => row.currency));

            // Get currencies
            const newCurrencies = CURRENCIES.filter(currency => currencyNames.includes(currency.name));
            setCurrencies(newCurrencies);

            // Update initial values
            const newInitialValues = {
                ...initialValues,
                currency: page.query.currency || currencyNames[0] || null,
            };
            setInitialValues(newInitialValues);
        }
    }, [
        initialValues,
        page.query,
        query.data,
    ]);

    useEffect(() => {
        if (query.data && initialValues.currency && initialValues.timesIds === undefined) {
            // Get times
            const newTimes = query.data.times.rows.filter(time => time.client.id === initialValues.clientId && time.currency === initialValues.currency);
            setTimes(newTimes);

            // Update initial values
            const newInitialValues = {
                ...initialValues,
                timesIds: newTimes.map(time => time.id),
            };
            setInitialValues(newInitialValues);
        }
    }, [
        initialValues,
        query.data,
    ]);

    useEffect(() => {
        if (query.data && initialValues.timesIds && initialValues.amount === undefined) {
            // Update initial values
            const newInitialValues = {
                ...initialValues,
                amount: times.filter(time => initialValues.timesIds?.includes(time.id)).reduce((total, time) => total + time.earnings[0].amount, 0),
            };
            setInitialValues(newInitialValues);
        }
    }, [
        initialValues,
        query.data,
        times,
    ]);
    
    function handleChange(values: Partial<InvoiceFields>) {
        // Prepare initial values
        const newInitialValues = {
            ...values,
        };
        
        // Check for update
        let update = true;
        if (initialValues.clientId !== values.clientId) {
            delete newInitialValues.amount;
            delete newInitialValues.currency;
            delete newInitialValues.timesIds;
        } else if (initialValues.currency !== values.currency) {
            delete newInitialValues.amount;
            delete newInitialValues.timesIds;
        } else if (initialValues.timesIds !== values.timesIds) {
            delete newInitialValues.amount;
        } else {
            update = false;
        }

        // Update initial values
        if (update) {
            setInitialValues(newInitialValues);
        }
    }

    function handleTimeClick(time: Time) {
        // Add or remove time from times
        const timesIds = initialValues.timesIds?.slice() || [];
        const timeIdIndex = timesIds.indexOf(time.id);
        if (timeIdIndex === -1) {
            timesIds.push(time.id);
        } else {
            timesIds.splice(timeIdIndex, 1);
        }

        // Update initial values
        const newInitialValues = {
            ...initialValues,
            amount: undefined,
            timesIds,
        };
        setInitialValues(newInitialValues);
    }

    async function handleSubmit(values: Partial<InvoiceFields>) {
        const result = await mutate({
            variables: {
                input: values,
            },
        });
        mutation.client.clearStore();
        router.push(`/invoices/${result.data.invoiceCreate.id}`);
    }
    
    return <Form initialValues={initialValues} loading={!initialValues || !!mutation.data || mutation.loading} title="Add Invoice" onChange={handleChange} onSubmit={handleSubmit}>
        <Form.Field name="number" />
        <Form.Field name="clientId" label="Client" options={clients} required />
        <Form.Field name="type" required />
        <Form.Field name="currency" options={currencies} required />
        <Form.Field name="amount" type="number" required />
        <Form.Field name="sentDate" type="date" />
        <Form.Field name="paidDate" type="date" />
        <Form.Field name="timesIds">
            {({ value }: FormFieldChildProps) => (
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
                            {times.map(time => (
                                <TableRow key={time.id} onClick={() => handleTimeClick(time)}>
                                    <TableCell padding="none">
                                        <Checkbox checked={value.includes(time.id)} size="small" />
                                    </TableCell>
                                    <TableCell>
                                        {time.project.name} › {time.task.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {time.date}
                                    </TableCell>
                                    <TableCell align="right">
                                        {time.duration}
                                    </TableCell>
                                    <TableCell align="right">
                                        <MoneyEnumeration items={time.earnings} />
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