import { Menu, Summary } from '@/components';
import { usePage } from '@/contexts/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Delete, Edit } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function TimeView() {

    const [time, setTime] = useState<Time | null>(null);
    const page = usePage();
    const router = useRouter();

    const query = useQuery<TimeQuery>(gql`query($id: ID!) {
        time(id: $id) {
            deletable
            id
            date
            duration
            task {
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
        timeDelete (id: $id) {
            id
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

    async function handleDelete() {
        if (time && confirm('Are you sure you want to delete this time?')) {
            await mutate({
                variables: {
                    id: time?.id,
                },
            });
            mutation.client.clearStore();
            router.push(`/tasks/${time?.task.id}`);
        }
    }

    const action = <Menu>
        <Menu.Item icon={Edit} label="Edit" link={`/times/${time?.id}/edit`} />
        <Menu.Item color="error" disabled={!time?.deletable} icon={Delete} label="Delete" onClick={handleDelete} />
    </Menu>;

    return <Summary action={action} entity={time} loading={mutation.loading}>
        <Summary.Field name="id" label="ID" />
        <Summary.Field name="date" />
        <Summary.Field name="duration" />
        <Summary.Field name="task.name" label="Task" getLink={`/tasks/${time?.task.id}`} />
    </Summary>;

}