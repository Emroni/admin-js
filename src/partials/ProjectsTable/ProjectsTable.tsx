import { Menu, Table } from '@/components';
import { PROJECT_BILLING, PROJECT_STATUS } from '@/constants';
import { gql, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import { useState } from 'react';

export default function ProjectsTable({ clientId }: ProjectsTableProps) {

    const [order, setOrder] = useState('name asc');

    const withClient = !clientId;

    const query = useQuery<ProjectsQuery>(gql`query ($filter: ProjectsFilter, $order: String, $withClient: Boolean!) {
        projects (filter: $filter, order: $order) {
            rows {
                billing
                id
                name
                status
                client @include(if: $withClient) {
                    id
                    name
                }
            }
        }
    }`, {
        variables: {
            filter: {
                clientId,
            },
            order,
            withClient,
        },
    });

    function handleOrderChange(order: string | null) {
        const newOrder = order || 'name asc';
        setOrder(newOrder);
    }

    const action = <Menu>
        <Menu.Item icon={Add} label="Add" link={'/projects/add' + (clientId ? `?clientId=${clientId}` : '')} />
    </Menu>;

    return <Table
        action={action}
        order={order}
        rows={query.data?.projects.rows}
        title="Projects"
        getRowLink={project => `/projects/${project.id}`}
        onOrderChange={handleOrderChange}
    >
        <Table.Column name="id" label="ID" />
        <Table.Column name="name" />
        {withClient && (
            <Table.Column name="client.name" label="Client" getLink={project => `/clients/${project.client?.id}`} />
        )}
        <Table.Column name="billing" options={PROJECT_BILLING} />
        <Table.Column name="status" options={PROJECT_STATUS} />
    </Table>;

}