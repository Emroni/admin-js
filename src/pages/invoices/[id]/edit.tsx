import { Form } from '@/components';
import { CURRENCIES } from '@/constants';
import { usePage } from '@/contexts/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function InvoiceEdit() {

    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const page = usePage();
    const router = useRouter();

    const query = useQuery<ClientsQuery & InvoiceQuery>(gql`query($id: ID!) {
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
        }
    }`, {
        variables: {
            id: page.query.id,
        },
    });

    const [mutate, mutation] = useMutation(gql`mutation($id: ID!, $input: InvoiceFields) {
        invoiceUpdate (id: $id, input: $input) {
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
        // Get invoice
        const newInvoice = query.data?.invoice || null;
        setInvoice(newInvoice);

        // Set page name
        page.setName(newInvoice?.name);
    }, [
        query.data,
        page,
    ]);

    async function handleSubmit(values: IndexedObject) {
        const result = await mutate({
            variables: {
                id: invoice?.id,
                input: values,
            },
        });
        router.push(`/invoices/${result.data.invoiceUpdate.id}`);
    }

    return <Form initialValues={invoice} loading={!invoice || mutation.loading} title={`Edit ${invoice?.name}`} onSubmit={handleSubmit}>
        <Form.Field name="number" />
        <Form.Field name="clientId" label="Client" options={query.data?.clients.rows} required />
        <Form.Field name="type" required />
        <Form.Field name="currency" options={CURRENCIES} required />
        <Form.Field name="amount" type="number" required />
        <Form.Field name="sentDate" label="Sent" type="date" />
        <Form.Field name="paidDate" label="Paid" type="date" />
    </Form>;

}