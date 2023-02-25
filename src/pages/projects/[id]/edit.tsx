import { Form } from '@/components';
import { usePage } from '@/contexts/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

export default function ProjectEdit() {

    const [clientIds, setClientIds] = useState<FormFieldOption[]>([]);
    const [project, setProject] = useState<Project | null>(null);
    const page = usePage();

    const query = useQuery<ClientsQuery & ProjectQuery>(gql`query($id: ID!) {
        clients {
            id
            name
        }
        project(id: $id) {
            billing
            clientId
            id
            name
            status
        }
    }`, {
        variables: {
            id: page.query.id,
        },
    });

    const [mutate, mutation] = useMutation(gql`mutation($id: ID!, $input: ProjectFields) {
        projectUpdate (id: $id, input: $input) {
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

        // Get project
        const newProject = query.data?.project || null;
        setProject(newProject);

        // Set page name
        page.setName(newProject?.name);
    }, [
        query.data,
        page,
    ]);

    function handleSubmit(values: IndexedObject) {
        mutate({
            variables: {
                id: project?.id,
                input: values,
            },
        });
    }

    return <Form initialValues={project} loading={!project || mutation.loading} title={`Edit ${project?.name}`} onSubmit={handleSubmit}>
        <Form.Field name="name" required />
        <Form.Field name="clientId" options={clientIds} required />
        <Form.Field name="billing" required />
        <Form.Field name="status" required />
    </Form>;

}