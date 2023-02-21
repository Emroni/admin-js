import { Table } from '@/components';
import { gql, useQuery } from '@apollo/client';

export default function Clients() {

    const query = useQuery<ClientsQuery>(gql`query {
        clients {
            id
            name
            email
        }
    }`);

    return <Table rows={query.data?.clients} title="Clients">
        <Table.Column name="id" label="ID" />
        <Table.Column name="name" getLink={client => `/clients/${client.id}`} />
        <Table.Column name="email" getLink={client => `mailto:${client.email}`} />
    </Table>;

}