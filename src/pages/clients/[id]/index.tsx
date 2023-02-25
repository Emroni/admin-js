import { LinkButton, Summary } from '@/components';
import { usePage } from '@/contexts/Page';
import { ProjectsTable } from '@/partials';
import { gql, useQuery } from '@apollo/client';
import { Edit } from '@mui/icons-material';
import { useEffect, useState } from 'react';

export default function ClientView() {

    const [client, setClient] = useState<Client | null>(null);
    const page = usePage();

    const query = useQuery<ClientQuery>(gql`query($id: ID!) {
        client(id: $id) {
            address
            currency
            email
            id
            name
        }
    }`, {
        variables: {
            id: page.query.id,
        },
    });

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

    const actions = <>
        <LinkButton icon={Edit} link={`/clients/${client?.id}/edit`} />
    </>;

    return <>
        <Summary actions={actions} entity={client}>
            <Summary.Field name="id" label="ID" />
            <Summary.Field name="name" />
            <Summary.Field name="currency" />
            <Summary.Field name="email" getLink={`mailto:${client?.email}`} />
            <Summary.Field name="address" />
        </Summary>
        <ProjectsTable clientId={page.query.id} />
    </>;

}