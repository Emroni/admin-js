import { Menu, Summary, TaskTimer } from '@/components';
import { usePage } from '@/contexts/Page';
import { InvoicesTable, TimesTable } from '@/partials';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Delete, Edit } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function TaskView() {

    const [task, setTask] = useState<Task | null>(null);
    const page = usePage();
    const router = useRouter();

    const query = useQuery<TaskQuery>(gql`query($id: Int!) {
        task(id: $id) {
            currency
            deletable
            earnings
            estimatedDuration
            id
            name
            price
            progress
            rate
            timer
            workedDuration
            client {
                id
                name
            }
            project {
                id
                name
            }
        }
    }`, {
        variables: {
            id: page.query.id,
        },
    });

    const [mutate, mutation] = useMutation(gql`mutation($id: Int!) {
        taskDelete (id: $id) {
            id
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

    async function handleDelete() {
        if (task && confirm('Are you sure you want to delete this task?')) {
            await mutate({
                variables: {
                    id: task?.id,
                },
            });
            mutation.client.clearStore();
            router.push(`/projects/${task?.project.id}`);
        }
    }

    const action = <Menu>
        <Menu.Item icon={Edit} label="Edit" link={`/tasks/${task?.id}/edit`} />
        <Menu.Item color="error" disabled={!task?.deletable} icon={Delete} label="Delete" onClick={handleDelete} />
    </Menu>;

    return <>
        <Summary action={action} entity={task} loading={mutation.loading}>
            <Summary.Field name="name" />
            <Summary.Field name="client.name" label="Client" getLink={`/clients/${task?.client.id}`} />
            <Summary.Field name="project.name" label="Project" getLink={`/projects/${task?.project.id}`} />
            <Summary.Field name="price" currency={task?.currency} type="money" />
            <Summary.Field name="rate" currency={task?.currency} type="money" />
            <Summary.Field name="earnings" currency={task?.currency} type="money" />
            <Summary.Field name="estimatedDuration" label="Estimated duration" />
            <Summary.Field name="workedDuration" label="Worked duration" />
            <Summary.Field name="progress" type="progress" />
            <Summary.Field name="timer">
                {({ value }: SummaryFieldChildProps) => (
                    <TaskTimer taskId={task?.id} value={value} />
                )}
            </Summary.Field>
        </Summary>
        <InvoicesTable taskId={page.query.id} />
        <TimesTable taskId={page.query.id} />
    </>;

}