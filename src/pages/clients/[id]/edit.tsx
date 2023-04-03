import { Form } from '@/components';
import { usePage } from '@/contexts/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ClientEdit() {

    const [client, setClient] = useState<Client | null>(null);
    const page = usePage();
    const router = useRouter();

    const query = useQuery<ClientQuery>(gql`query($id: Int!) {
        client(id: $id) {
            address
            email
            id
            name
        }
    }`, {
        variables: {
            id: page.query.id,
        },
    });

    const [mutate, mutation] = useMutation(gql`mutation($id: Int!, $input: ClientFields) {
        clientUpdate (id: $id, input: $input) {
            address
            email
            id
            name
        }
    }`);

    useEffect(() => {
        // Get client
        const newClient = query.data?.client || null;
        setClient(newClient);

        // Set page name
        page.setName(newClient?.name);
    }, [
        query.data,
        page,
    ]);

    async function handleSubmit(values: IndexedObject) {
        const result = await mutate({
            variables: {
                id: client?.id,
                input: values,
            },
        });
        router.push(`/clients/${result.data.clientUpdate.id}`);
    }
    
    return <Form initialValues={client} loading={!client || mutation.loading} title={`Edit ${client?.name}`} onSubmit={handleSubmit}>
        <Form.Field name="name" required />
        <Form.Field name="email" />
        <Form.Field name="address" type="textarea" />
    </Form>;

}