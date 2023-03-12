import { Menu, Table } from '@/components';
import { PROJECT_STATUS } from '@/constants';
import { gql, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import { useState } from 'react';

export default function ProjectsTable({ clientId, defaultPerPage = 10 }: ProjectsTableProps) {

    const [order, setOrder] = useState('id desc');
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(defaultPerPage);

    const withClient = !clientId;

    const query = useQuery<ProjectsQuery>(gql`query ($filter: ProjectsFilter, $order: String, $page: Int, $perPage: Int, $withClient: Boolean!) {
        projects (filter: $filter, order: $order, page: $page, perPage: $perPage) {
            order,
            page,
            perPage,
            rows {
                currency
                earnings
                estimatedHours
                id
                name
                progress
                status
                workedHours
                client @include(if: $withClient) {
                    id
                    name
                }
            }
            total
        }
    }`, {
        variables: {
            filter: {
                clientId,
            },
            order,
            page,
            perPage,
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
        data={query.data?.projects}
        title="Projects"
        getRowLink={project => `/projects/${project.id}`}
        onOrderChange={handleOrderChange}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
    >
        <Table.Column name="status" options={PROJECT_STATUS} />
        <Table.Column name="name" />
        {withClient && (
            <Table.Column name="client.name" label="Client" getLink={project => `/clients/${project.client?.id}`} />
        )}
        <Table.Column name="earnings" type="money" />
        <Table.Column name="estimatedHours" label="Estimated hours" type="hours" />
        <Table.Column name="workedHours" label="Worked hours" type="hours" />
        <Table.Column name="progress" type="progress" />
    </Table>;

}