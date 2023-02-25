import { Form } from '@/components';
import { PROJECT_BILLING, PROJECT_STATUS } from '@/constants';
import { usePage } from '@/contexts/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

export default function ProjectAdd() {

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

    async function handleSubmit(values: IndexedObject) {
        const result = await mutate({
            variables: {
                input: values,
            },
        });
        mutation.client.clearStore();
        router.push(`/projects/${result.data.projectCreate.id}`);
    }

    return <Form initialValues={page.query} loading={!!mutation.data || mutation.loading} title="Add Project" onSubmit={handleSubmit}>
        <Form.Field name="name" required />
        <Form.Field name="clientId" label="Client" options={query.data?.clients} required />
        <Form.Field name="billing" options={PROJECT_BILLING} required />
        <Form.Field name="status" options={PROJECT_STATUS} required />
    </Form>;

}