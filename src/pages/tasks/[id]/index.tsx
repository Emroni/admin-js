import { Menu, Summary } from '@/components';
import { usePage } from '@/contexts/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Delete, Edit } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function TaskView() {

    const [task, setTask] = useState<Task | null>(null);
    const page = usePage();
    const router = useRouter();

    const query = useQuery<TaskQuery>(gql`query($id: ID!) {
        task(id: $id) {
            deletable
            id
            name
            estimatedHours
            price
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

    const [mutate, mutation] = useMutation(gql`mutation($id: ID!) {
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

    return <Summary action={action} entity={task} loading={mutation.loading}>
        <Summary.Field name="id" label="ID" />
        <Summary.Field name="name" />
        <Summary.Field name="project.name" label="Project" getLink={`/projects/${task?.project.id}`} />
        <Summary.Field name="estimatedHours" />
        <Summary.Field name="price" />
    </Summary>;

}