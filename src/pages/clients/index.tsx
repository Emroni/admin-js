import { Menu, Table } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import { useState } from 'react';

export default function Clients() {

    const [order, setOrder] = useState('name asc');
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const query = useQuery<ClientsQuery>(gql`query ($order: String, $page: Int, $perPage: Int) {
        clients (order: $order, page: $page, perPage: $perPage) {
            order,
            page,
            perPage,
            rows {
                address
                currency
                email
                id
                name
            }
            total
        }
    }`, {
        variables: {
            order,
            page,
            perPage,
        },
    });

    function handleOrderChange(order: string | null) {
        const newOrder = order || 'name asc';
        setOrder(newOrder);
    }

    const action = <Menu>
        <Menu.Item icon={Add} label="Add" link="/clients/add" />
    </Menu>;

    return <Table
        action={action}
        data={query.data?.clients}
        title="Clients"
        getRowLink={client => `/clients/${client.id}`}
        onOrderChange={handleOrderChange}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
    >
        <Table.Column name="id" label="ID" />
        <Table.Column name="name" />
        <Table.Column name="currency" />
        <Table.Column name="email" getLink={client => `mailto:${client.email}`} />
        <Table.Column name="address" />
    </Table>;

}