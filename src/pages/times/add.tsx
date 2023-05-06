import { Form } from '@/components';
import { usePage } from '@/contexts/Page/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

export default function TimeAdd() {

    const router = useRouter();
    const page = usePage();

    const query = useQuery<TasksQuery & TimeQuery>(gql`query {
        tasks {
            rows {
                id
                name
            }
        }
    }`);

    const [mutate, mutation] = useMutation(gql`mutation($input: TimeFields) {
        timeCreate (input: $input) {
            id
            date
            duration
            taskId
        }
    }`);

    async function handleSubmit(values: IndexedObject) {
        const result = await mutate({
            variables: {
                input: values,
            },
        });
        mutation.client.clearStore();
        router.push(`/times/${result.data.timeCreate.id}`);
    }

    return <Form initialValues={page.query} loading={!!mutation.data || mutation.loading} title="Add Time" onSubmit={handleSubmit}>
        <Form.Field name="taskId" label="Task" options={query.data?.tasks.rows} required />
        <Form.Field name="date" required type="date" />
        <Form.Field name="duration" required type="time" />
    </Form>;

}