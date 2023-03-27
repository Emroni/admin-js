import { Menu, Summary } from '@/components';
import { usePage } from '@/contexts/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Delete, Edit } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function InvoiceView() {

    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const page = usePage();
    const router = useRouter();

    const query = useQuery<InvoiceQuery>(gql`query($id: ID!) {
        invoice(id: $id) {
            id
            number
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
        }
    }`, {
        variables: {
            id: page.query.id,
        },
    });

    const [mutate, mutation] = useMutation(gql`mutation($id: ID!) {
        invoiceDelete (id: $id) {
            id
        }
    }`);

    useEffect(() => {
        // Get invoice
        const newInvoice = query.data?.invoice || null;
        setInvoice(newInvoice);

        // Set page name
        page.setName(newInvoice?.number);
    }, [
        query.data,
        page,
    ]);

    async function handleDelete() {
        if (invoice && confirm('Are you sure you want to delete this invoice?')) {
            await mutate({
                variables: {
                    id: invoice?.id,
                },
            });
            mutation.client.clearStore();
            router.push(`/clients/${invoice?.client.id}`);
        }
    }

    const action = <Menu>
        <Menu.Item icon={Edit} label="Edit" link={`/invoices/${invoice?.id}/edit`} />
        <Menu.Item color="error" disabled={!invoice?.deletable} icon={Delete} label="Delete" onClick={handleDelete} />
    </Menu>;

    return <>
        <Summary action={action} entity={invoice} loading={mutation.loading}>
            <Summary.Field name="number" />
            <Summary.Field name="client.name" label="Client" getLink={`/clients/${invoice?.client.id}`} />
            <Summary.Field name="amount" currency={invoice?.currency} type="money" />
            <Summary.Field name="sentDate" label="Sent" />
            <Summary.Field name="paidDate" label="Paid" />
        </Summary>
    </>;

}