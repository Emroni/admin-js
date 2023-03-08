import { Menu, Table } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import { useState } from 'react';

export default function TasksTable({ clientId, projectId }: TasksTableProps) {

    const [order, setOrder] = useState('id desc');
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const withClient = !clientId;
    const withProject = !projectId;

    const query = useQuery<TasksQuery>(gql`query ($filter: TasksFilter, $order: String, $page: Int, $perPage: Int, $withClient: Boolean!, $withProject: Boolean!) {
        tasks (filter: $filter, order: $order, page: $page, perPage: $perPage) {
            order,
            page,
            perPage,
            rows {
                id
                name
                estimatedHours
                currency
                price
                rate
                workedHours
                client @include(if: $withClient) {
                    id
                    name
                }
                project @include(if: $withProject) {
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
                projectId,
            },
            order,
            page,
            perPage,
            withClient,
            withProject,
        },
    });

    function handleOrderChange(order: string | null) {
        const newOrder = order || 'name asc';
        setOrder(newOrder);
    }

    const action = <Menu>
        <Menu.Item icon={Add} label="Add" link={'/tasks/add' + (projectId ? `?projectId=${projectId}` : '')} />
    </Menu>;

    return <Table
        action={action}
        data={query.data?.tasks}
        title="Tasks"
        getRowLink={task => `/tasks/${task.id}`}
        onOrderChange={handleOrderChange}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
    >
        <Table.Column name="name" />
        {withClient && (
            <Table.Column name="client.name" label="Client" getLink={task => `/clients/${task.client?.id}`} />
        )}
        {withProject && (
            <Table.Column name="project.name" label="Project" getLink={task => `/projects/${task.project?.id}`} />
        )}
        <Table.Column name="price" align="right" type="money" />
        <Table.Column name="rate" align="right" type="money" />
        <Table.Column name="estimatedHours" label="Estimated hours" align="right" type="hours" />
        <Table.Column name="workedHours" label="Worked hours" align="right" type="hours" />
    </Table>;

}