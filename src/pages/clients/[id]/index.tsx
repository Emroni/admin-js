import { Page, Summary } from '@/components';
import { ProjectsTable } from '@/partials';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

export default function Client() {

    const router = useRouter();

    const clientId = parseInt(router.query.id as string);

    const query = useQuery<ClientQuery>(gql`query($id: ID!) {
        client(id: $id) {
            id
            name
            email
        }
    }`, {
        variables: {
            id: clientId,
        },
    });

    const client = query.data?.client;

    return <Page title={client?.name}>
        <Summary entity={client}>
            <Summary.Field name="id" label="ID" />
            <Summary.Field name="name" />
            <Summary.Field name="email" />
        </Summary>
        <ProjectsTable clientId={clientId} />
    </Page>;

}