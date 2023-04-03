import { Menu, Table, TaskTimer } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import { useState } from 'react';

export default function TasksTable({ clientId, defaultPerPage = 10, invoiceId, projectId }: TasksTableProps) {

    const [order, setOrder] = useState('id desc');
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(defaultPerPage);

    const withClient = !clientId;
    const withProject = !projectId;

    const query = useQuery<TasksQuery>(gql`query ($filter: TasksFilter, $order: String, $page: Int, $perPage: Int, $withClient: Boolean!, $withProject: Boolean!) {
        tasks (filter: $filter, order: $order, page: $page, perPage: $perPage) {
            order,
            page,
            perPage,
            rows {
                currency
                earnings
                estimatedDuration
                id
                name
                price
                progress
                rate
                timer
                workedDuration
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
                invoiceId,
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
        <Table.Column name="price" type="money" />
        <Table.Column name="rate" type="money" />
        <Table.Column name="earnings" type="money" />
        <Table.Column name="estimatedDuration" />
        <Table.Column name="workedDuration" />
        <Table.Column name="progress" type="progress" />
        <Table.Column name="timer">
            {({ row, value }: TableColumnChildProps) => (
                <TaskTimer taskId={row.id} value={value} />
            )}
        </Table.Column>
    </Table>;

}