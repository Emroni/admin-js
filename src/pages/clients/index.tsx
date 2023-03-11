import { Menu, Table } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import { useState } from 'react';

export default function Clients() {

    const [order, setOrder] = useState('name asc');
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(20);

    const query = useQuery<ClientsQuery>(gql`query ($order: String, $page: Int, $perPage: Int) {
        clients (order: $order, page: $page, perPage: $perPage) {
            order,
            page,
            perPage,
            rows {
                estimatedHours
                id
                name
                progress
                workedHours
                projects {
                    id
                }
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
        <Table.Column name="name" />
        <Table.Column name="projects" label="Projects" align="right" />
        <Table.Column name="estimatedHours" label="Estimated hours" align="right" type="hours" />
        <Table.Column name="workedHours" label="Worked hours" align="right" type="hours" />
        <Table.Column name="progress" align="right" type="progress" />
    </Table>;

}