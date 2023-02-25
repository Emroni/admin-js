import { LinkButton, Table } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';

export default function Clients() {

    const query = useQuery<ClientsQuery>(gql`query {
        clients {
            address
            currency
            email
            id
            name
        }
    }`);

    const actions = <>
        <LinkButton icon={Add} link="/clients/add" />
    </>;

    return <Table actions={actions} rows={query.data?.clients} title="Clients" getRowLink={client => `/clients/${client.id}`}>
        <Table.Column name="id" label="ID" />
        <Table.Column name="name" />
        <Table.Column name="currency" />
        <Table.Column name="email" getLink={client => `mailto:${client.email}`} />
        <Table.Column name="address" />
    </Table>;

}