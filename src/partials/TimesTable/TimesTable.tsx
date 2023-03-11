import { Menu, Table } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import { useState } from 'react';

export default function TimesTable({ clientId, defaultPerPage = 10, projectId, taskId }: TimesTableProps) {

    const [order, setOrder] = useState('id desc');
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(defaultPerPage);

    const withTask = !taskId;
    const withProject = !projectId;
    const withClient = !clientId;
    
    const query = useQuery<TimesQuery>(gql`query ($filter: TimesFilter, $order: String, $page: Int, $perPage: Int, $withClient: Boolean!, $withProject: Boolean!, $withTask: Boolean!) {
        times (filter: $filter, order: $order, page: $page, perPage: $perPage) {
            order,
            page,
            perPage,
            rows {
                id
                date
                duration
                client @include(if: $withClient) {
                    id
                    name
                }
                project @include(if: $withProject) {
                    id
                    name
                }
                task @include(if: $withTask) {
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
                taskId,
            },
            order,
            page,
            perPage,
            withClient,
            withProject,
            withTask,
        },
    });

    function handleOrderChange(order: string | null) {
        const newOrder = order || 'name asc';
        setOrder(newOrder);
    }

    const action = <Menu>
        <Menu.Item icon={Add} label="Add" link={'/times/add' + (taskId ? `?taskId=${taskId}` : '')} />
    </Menu>;

    return <Table
        action={action}
        data={query.data?.times}
        title="Times"
        getRowLink={task => `/times/${task.id}`}
        onOrderChange={handleOrderChange}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
    >
        {withClient && (
            <Table.Column name="client.name" label="Client" getLink={client => `/clients/${client.client?.id}`} />
        )}
        {withProject && (
            <Table.Column name="project.name" label="Project" getLink={project => `/projects/${project.project?.id}`} />
        )}
        {withTask && (
            <Table.Column name="task.name" label="Task" getLink={task => `/tasks/${task.task?.id}`} />
        )}
        <Table.Column name="date" align="right" />
        <Table.Column name="duration" align="right" />
    </Table>;

}