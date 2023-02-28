import { Menu, Table } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import { useState } from 'react';

export default function Clients() {

    const [order, setOrder] = useState<TableOrder>({ name: 'asc' });

    const query = useQuery<ClientsQuery>(gql`query ($order: ClientsOrder) {
        clients (order: [$order]) {
            address
            currency
            email
            id
            name
        }
    }`, {
        variables: {
            order,
        },
    });

    function handleOrderChange(order: TableOrder | null) {
        const newOrder = order || { name: 'asc' };
        setOrder(newOrder);
    }

    const action = <Menu>
        <Menu.Item icon={Add} label="Add" link="/clients/add" />
    </Menu>;

    return <Table action={action} order={order} rows={query.data?.clients} title="Clients" getRowLink={client => `/clients/${client.id}`} onOrderChange={handleOrderChange}>
        <Table.Column name="id" label="ID" />
        <Table.Column name="name" />
        <Table.Column name="currency" />
        <Table.Column name="email" getLink={client => `mailto:${client.email}`} />
        <Table.Column name="address" />
    </Table>;

}