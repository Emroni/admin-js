import { Form } from '@/components';
import { PROJECT_BILLING, PROJECT_STATUS } from '@/constants';
import { usePage } from '@/contexts/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ProjectEdit() {

    const [project, setProject] = useState<Project | null>(null);
    const page = usePage();
    const router = useRouter();

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
        // Get project
        const newProject = query.data?.project || null;
        setProject(newProject);

        // Set page name
        page.setName(newProject?.name);
    }, [
        query.data,
        page,
    ]);

    async function handleSubmit(values: IndexedObject) {
        const result = await mutate({
            variables: {
                id: project?.id,
                input: values,
            },
        });
        router.push(`/projects/${result.data.projectUpdate.id}`);
    }

    return <Form initialValues={project} loading={!project || mutation.loading} title={`Edit ${project?.name}`} onSubmit={handleSubmit}>
        <Form.Field name="name" required />
        <Form.Field name="clientId" label="Client" options={query.data?.clients} required />
        <Form.Field name="billing" options={PROJECT_BILLING} required />
        <Form.Field name="status" options={PROJECT_STATUS} required />
    </Form>;

}