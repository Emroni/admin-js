import { Form, MoneyEnumeration } from '@/components';
import { CURRENCIES } from '@/constants';
import { usePage } from '@/contexts/Page/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Checkbox, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { FormikContextType } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function InvoiceEdit() {

    const [initialValues, setInitialValues] = useState<Partial<InvoiceFields>>({});
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [times, setTimes] = useState<Time[]>([]);
    const page = usePage();
    const router = useRouter();

    const query = useQuery<ClientsQuery & InvoiceQuery & TimesQuery>(gql`query($id: Int!) {
        clients {
            rows {
                id
                name
            }
        }
        invoice(id: $id) {
            clientId
            id
            number
            name
            currency
            amount
            type
            description
            sentDate
            paidDate
            client {
                id
                name
            }
            times {
                currency
                date
                duration
                id
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
    }`, {
        variables: {
            id: page.query.id,
        },
    });

    const [mutate, mutation] = useMutation(gql`mutation($id: Int!, $input: InvoiceFields) {
        invoiceUpdate (id: $id, input: $input) {
            id
        }
    }`);

    useEffect(() => {
        // Get invoice
        const newInvoice = query.data?.invoice || null;
        setInvoice(newInvoice);

        // Get initial values
        const newInitialValues = {
            amount: newInvoice?.amount,
            clientId: newInvoice?.clientId,
            currency: newInvoice?.currency,
            description: newInvoice?.description,
            number: newInvoice?.number,
            paidDate: newInvoice?.paidDate,
            sentDate: newInvoice?.sentDate,
            timesIds: newInvoice?.times.map(time => time.id),
            type: newInvoice?.type,
        };
        setInitialValues(newInitialValues);

        // Get times
        const queryTimes = query.data?.times.rows.filter(time => time.client.id === newInitialValues.clientId && time.currency === newInitialValues.currency) || [];
        const newTimes = newInvoice?.times.concat(queryTimes) || [];
        newTimes.sort((a, b) => a.date < b.date || a.id < b.id ? -1 : 1);
        setTimes(newTimes);

        // Set page name
        page.setName(newInvoice?.name);
    }, [
        query.data,
        page,
    ]);

    useEffect(() => {
        if (invoice && initialValues.timesIds && initialValues.amount === undefined) {
            // Update initial values
            const newInitialValues = {
                ...initialValues,
                amount: invoice.times.filter(time => initialValues.timesIds?.includes(time.id)).reduce((total, time) => total + time.earnings[0].amount, 0),
            };
            setInitialValues(newInitialValues);
        }
    }, [
        initialValues,
        invoice,
    ]);

    function handleTimeClick(timeId: number, timesIds: number[], form: FormikContextType<InvoiceFields>) {
        // Add or remove timeId from timesIds
        const timeIdIndex = timesIds.indexOf(timeId);
        if (timeIdIndex === -1) {
            timesIds.push(timeId);
        } else {
            timesIds.splice(timeIdIndex, 1);
        }
        form.setFieldValue('timesIds', timesIds);

        // Update amount
        const amount = invoice?.times.filter(time => timesIds.includes(time.id)).reduce((total, time) => total + time.earnings[0].amount, 0);
        form.setFieldValue('amount', amount);
    }

    async function handleSubmit(values: IndexedObject) {
        const result = await mutate({
            variables: {
                id: invoice?.id,
                input: values,
            },
        });
        mutation.client.clearStore();
        router.push(`/invoices/${result.data.invoiceUpdate.id}`);
    }

    return <Form initialValues={initialValues} loading={!initialValues || mutation.loading} title={`Edit ${invoice?.name}`} onSubmit={handleSubmit}>
        <Form.Field name="number" disabled required />
        <Form.Field name="clientId" disabled label="Client" options={query.data?.clients.rows} required />
        <Form.Field name="type" required />
        <Form.Field name="currency" disabled options={CURRENCIES} required />
        <Form.Field name="amount" type="number" required />
        <Form.Field name="sentDate" type="date" />
        <Form.Field name="paidDate" type="date" />
        <Form.Field name="timesIds">
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
                            {times.map(time => (
                                <TableRow key={time.id} onClick={() => handleTimeClick(time.id, value, form)}>
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