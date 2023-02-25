import { Menu, Table } from '@/components';
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

    const action = <Menu>
        <Menu.Item icon={Add} label="Add" link="/clients/add" />
    </Menu>;

    return <Table action={action} rows={query.data?.clients} title="Clients" getRowLink={client => `/clients/${client.id}`}>
        <Table.Column name="id" label="ID" />
        <Table.Column name="name" />
        <Table.Column name="currency" />
        <Table.Column name="email" getLink={client => `mailto:${client.email}`} />
        <Table.Column name="address" />
    </Table>;

}