import { Form } from '@/components';
import { CURRENCIES } from '@/constants';
import { usePage } from '@/contexts/Page/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

export default function TaskAdd() {

    const router = useRouter();
    const page = usePage();

    const query = useQuery<ProjectsQuery & TaskQuery>(gql`query {
        projects {
            rows {
                id
                name
            }
        }
    }`);

    const [mutate, mutation] = useMutation(gql`mutation($input: TaskFields) {
        taskCreate (input: $input) {
            estimatedHours
            id
            name
            currency
            estimatedHours
            price
            projectId
            rate
        }
    }`);

    async function handleSubmit(values: IndexedObject) {
        const result = await mutate({
            variables: {
                input: values,
            },
        });
        mutation.client.clearStore();
        router.push(`/tasks/${result.data.taskCreate.id}`);
    }

    return <Form initialValues={page.query} loading={!!mutation.data || mutation.loading} title="Add Task" onSubmit={handleSubmit}>
        <Form.Field name="name" required />
        <Form.Field name="projectId" label="Project" options={query.data?.projects.rows} required />
        <Form.Field name="currency" options={CURRENCIES} required />
        <Form.Field name="price" required type="number" />
        <Form.Field name="rate" required type="number" />
        <Form.Field name="estimatedHours" required type="number" />
    </Form>;

}