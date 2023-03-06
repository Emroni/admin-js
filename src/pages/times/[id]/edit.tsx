import { Form } from '@/components';
import { usePage } from '@/contexts/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function TimeEdit() {

    const [time, setTime] = useState<Time | null>(null);
    const page = usePage();
    const router = useRouter();

    const query = useQuery<TasksQuery & TimeQuery>(gql`query($id: ID!) {
        tasks {
            rows {
                id
                name
            }
        }
        time(id: $id) {
            id
            date
            duration
            taskId
        }
    }`, {
        variables: {
            id: page.query.id,
        },
    });

    const [mutate, mutation] = useMutation(gql`mutation($id: ID!, $input: TimeFields) {
        timeUpdate (id: $id, input: $input) {
            id
            date
            duration
            taskId
        }
    }`);

    useEffect(() => {
        // Get time
        const newTime = query.data?.time || null;
        setTime(newTime);

        // Set page name
        page.setName(newTime?.name);
    }, [
        query.data,
        page,
    ]);

    async function handleSubmit(values: IndexedObject) {
        const result = await mutate({
            variables: {
                id: time?.id,
                input: values,
            },
        });
        router.push(`/times/${result.data.timeUpdate.id}`);
    }

    return <Form initialValues={time} loading={!time || mutation.loading} title={`Edit ${time?.name}`} onSubmit={handleSubmit}>
        <Form.Field name="taskId" label="Task" options={query.data?.tasks.rows} required />
        <Form.Field name="date" required />
        <Form.Field name="duration" required />
    </Form>;

}