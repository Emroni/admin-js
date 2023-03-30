import { Form } from '@/components';
import { CURRENCIES } from '@/constants';
import { usePage } from '@/contexts/Page';
import { getUnique } from '@/helpers';
import { gql, useMutation, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function InvoiceAdd() {

    const [clientId, setClientId] = useState<any>(undefined);
    const [initialValues, setInitialValues] = useState<IndexedObject | null>(null);
    const router = useRouter();
    const page = usePage();

    const query = useQuery<ClientsQuery & InvoicesQuery & TimesQuery>(gql`query ($clientId: ID) {
        clients {
            rows {
                id
                name
            }
        }
        invoices (order: "id desc", page: 0, perPage: 1) {
            rows {
                number
                type
            }
        }
        times (filter: { clientId: $clientId, invoiceId: null }, order: "id asc", page: 0, perPage: 1000) {
            rows {
                currency
                earnings
            }
        }
    }`, {
        variables: {
            clientId,
        },
    });

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
        // Get client id
        if (!clientId && page.query.clientId) {
            setClientId(page.query.clientId);
        }
    }, [
        clientId,
        page.query,
    ]);

    useEffect(() => {
        if (query.data) {
            // Get previous invoice
            const prevInvoice = query.data.invoices.rows[0];

            // Update initial values
            // TODO: Check for multiple currencies
            const newInitialValues = {
                amount: clientId ? query.data.times.rows.reduce((total, time) => total + time.earnings, 0) : 0,
                clientId,
                currency: clientId ? getUnique(query.data.times.rows.map(row => row.currency))[0] : undefined,
                number: prevInvoice.number ? `${prevInvoice.number.slice(0, 3)}${parseInt(prevInvoice.number.slice(3)) + 1}` : undefined,
                sentDate: dayjs.utc().format('YYYY-MM-DD'),
                type: prevInvoice.type,
            };
            setInitialValues(newInitialValues);
        }
    }, [
        clientId,
        query.data,
    ]);

    function handleChange(values: IndexedObject) {
        if (clientId !== values.clientId) {
            setClientId(values.clientId);
        }
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

    return <Form initialValues={initialValues} loading={!initialValues || !!mutation.data || mutation.loading} title="Add Invoice" onChange={handleChange} onSubmit={handleSubmit}>
        <Form.Field name="number" />
        <Form.Field name="clientId" label="Client" options={query.data?.clients.rows} required />
        <Form.Field name="type" required />
        <Form.Field name="currency" options={CURRENCIES} required />
        <Form.Field name="amount" type="number" required />
        <Form.Field name="sentDate" label="Sent" type="date" />
        <Form.Field name="paidDate" label="Paid" type="date" />
    </Form>;

}