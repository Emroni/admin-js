import { Form } from '@/components';
import { CURRENCIES } from '@/constants';
import { usePage } from '@/contexts/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function TaskEdit() {

    const [task, setTask] = useState<Task | null>(null);
    const page = usePage();
    const router = useRouter();

    const query = useQuery<ProjectsQuery & TaskQuery>(gql`query($id: Int!) {
        projects {
            rows {
                id
                name
            }
        }
        task(id: $id) {
            estimatedHours
            id
            name
            currency
            estimatedHours
            price
            projectId
            rate
        }
    }`, {
        variables: {
            id: page.query.id,
        },
    });

    const [mutate, mutation] = useMutation(gql`mutation($id: Int!, $input: TaskFields) {
        taskUpdate (id: $id, input: $input) {
            estimatedHours
            id
            name
            price
            projectId
        }
    }`);

    useEffect(() => {
        // Get task
        const newTask = query.data?.task || null;
        setTask(newTask);

        // Set page name
        page.setName(newTask?.name);
    }, [
        query.data,
        page,
    ]);

    async function handleSubmit(values: IndexedObject) {
        const result = await mutate({
            variables: {
                id: task?.id,
                input: values,
            },
        });
        router.push(`/tasks/${result.data.taskUpdate.id}`);
    }

    return <Form initialValues={task} loading={!task || mutation.loading} title={`Edit ${task?.name}`} onSubmit={handleSubmit}>
        <Form.Field name="name" required />
        <Form.Field name="projectId" label="Project" options={query.data?.projects.rows} required />
        <Form.Field name="currency" options={CURRENCIES} required />
        <Form.Field name="price" required type="number" />
        <Form.Field name="rate" required type="number" />
        <Form.Field name="estimatedHours" required type="number" />
    </Form>;

}