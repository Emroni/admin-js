import { Form } from '@/components';
import { CURRENCIES } from '@/constants';
import { usePage } from '@/contexts/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

export default function InvoiceAdd() {

    const router = useRouter();
    const page = usePage();

    const query = useQuery<ClientsQuery & InvoiceQuery>(gql`query {
        clients {
            rows {
                id
                name
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

    async function handleSubmit(values: IndexedObject) {
        const result = await mutate({
            variables: {
                input: values,
            },
        });
        mutation.client.clearStore();
        router.push(`/invoices/${result.data.invoiceCreate.id}`);
    }

    return <Form initialValues={page.query} loading={!!mutation.data || mutation.loading} title="Add Invoice" onSubmit={handleSubmit}>
        <Form.Field name="number" />
        <Form.Field name="clientId" label="Client" options={query.data?.clients.rows} required />
        <Form.Field name="type" required />
        <Form.Field name="currency" options={CURRENCIES} required />
        <Form.Field name="amount" type="number" required />
        <Form.Field name="sentDate" label="Sent" type="date" />
        <Form.Field name="paidDate" label="Paid" type="date" />
    </Form>;

}