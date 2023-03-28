import { Menu, Summary } from '@/components';
import { usePage } from '@/contexts/Page';
import { InvoicesTable, ProjectsTable, TasksTable, TimesTable } from '@/partials';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Delete, Edit } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ClientView() {

    const [client, setClient] = useState<Client | null>(null);
    const page = usePage();
    const router = useRouter();

    const query = useQuery<ClientQuery>(gql`query($id: ID!) {
        client(id: $id) {
            address
            currency
            deletable
            earnings
            email
            estimatedDuration
            id
            name
            progress
            workedDuration
        }
    }`, {
        variables: {
            id: page.query.id,
        },
    });

    const [mutate, mutation] = useMutation(gql`mutation($id: ID!) {
        clientDelete (id: $id) {
            id
        }
    }`);

    useEffect(() => {
        // Get client
        const newClient = query.data?.client || null;
        setClient(newClient);

        // Set page name
        page.setName(newClient?.name);
    }, [
        query.data,
        page,
    ]);

    async function handleDelete() {
        if (client && confirm('Are you sure you want to delete this client?')) {
            await mutate({
                variables: {
                    id: client?.id,
                },
            });
            mutation.client.clearStore();
            router.push('/clients');
        }
    }

    const action = <Menu>
        <Menu.Item icon={Edit} label="Edit" link={`/clients/${client?.id}/edit`} />
        <Menu.Item color="error" disabled={!client?.deletable} icon={Delete} label="Delete" onClick={handleDelete} />
    </Menu>;

    return <>
        <Summary action={action} entity={client} loading={mutation.loading}>
            <Summary.Field name="name" />
            <Summary.Field name="email" getLink={`mailto:${client?.email}`} />
            <Summary.Field name="address" />
            <Summary.Field name="earnings" currency={client?.currency} type="money" />
            <Summary.Field name="estimatedDuration" label="Estimated duration" type="duration" />
            <Summary.Field name="workedDuration" label="Worked duration" type="duration" />
            <Summary.Field name="progress" type="progress" />
        </Summary>
        <InvoicesTable clientId={page.query.id} />
        <ProjectsTable clientId={page.query.id} />
        <TasksTable clientId={page.query.id} />
        <TimesTable clientId={page.query.id} />
    </>;

}