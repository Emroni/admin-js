import { Summary } from '@/components';
import { usePage } from '@/contexts/Page';
import { ProjectsTable } from '@/partials';
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

export default function ClientView() {

    const [client, setClient] = useState<Client | null>(null);
    const page = usePage();

    const query = useQuery<ClientQuery>(gql`query($id: ID!) {
        client(id: $id) {
            id
            name
            email
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

    return <>
        <Summary entity={client}>
            <Summary.Field name="id" label="ID" />
            <Summary.Field name="name" />
            <Summary.Field name="email" />
        </Summary>
        <ProjectsTable clientId={page.query.id} />
    </>;

}