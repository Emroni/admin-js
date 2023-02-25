import { Form } from '@/components';
import { usePage } from '@/contexts/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ProjectAdd() {

    const [clientIds, setClientIds] = useState<FormFieldOption[]>([]);
    const router = useRouter();
    const page = usePage();

    const query = useQuery<ClientsQuery & ProjectQuery>(gql`query {
        clients {
            id
            name
        }
    }`);

    const [mutate, mutation] = useMutation(gql`mutation($input: ProjectFields) {
        projectCreate (input: $input) {
            billing
            clientId
            id
            name
            status
        }
    }`);

    useEffect(() => {
        // Get clientIds
        const newClientIds = query.data?.clients.map(client => ({
            label: client.name,
            value: client.id,
        })) || [];
        setClientIds(newClientIds);
    }, [
        query.data,
    ]);

    async function handleSubmit(values: IndexedObject) {
        const result = await mutate({
            variables: {
                input: values,
            },
        });
        router.push(`/projects/${result.data.projectCreate.id}`);
    }

    return <Form initialValues={page.query} loading={!!mutation.data || mutation.loading} title="Add Project" onSubmit={handleSubmit}>
        <Form.Field name="name" required />
        <Form.Field name="clientId" label="Client" options={clientIds} required />
        <Form.Field name="billing" required />
        <Form.Field name="status" required />
    </Form>;

}