import { Form } from '@/components';
import { usePage } from '@/contexts/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

export default function ClientEdit() {

    const [client, setClient] = useState<Client | null>(null);
    const page = usePage();

    const query = useQuery<ClientQuery>(gql`query($id: ID!) {
        client(id: $id) {
            address
            currency
            email
            id
            name
        }
    }`, {
        variables: {
            id: page.query.id,
        },
    });

    const [mutate, mutation] = useMutation(gql`mutation($id: ID!, $input: ClientFields) {
        clientUpdate (id: $id, input: $input) {
            address
            currency
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

    function handleSubmit(values: IndexedObject) {
        mutate({
            variables: {
                id: client?.id,
                input: values,
            },
        });
    }
    
    return <Form initialValues={client} loading={!client || mutation.loading} title={`Edit ${client?.name}`} onSubmit={handleSubmit}>
        <Form.Field name="name" required />
        <Form.Field name="currency" required />
        <Form.Field name="email" />
        <Form.Field name="address" type="textarea" />
    </Form>;

}