import { Menu, Table } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import { useState } from 'react';

export default function TasksTable({ projectId }: TasksTableProps) {

    const [order, setOrder] = useState('id desc');
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const withProject = !projectId;

    const query = useQuery<TasksQuery>(gql`query ($filter: TasksFilter, $order: String, $page: Int, $perPage: Int, $withProject: Boolean!) {
        tasks (filter: $filter, order: $order, page: $page, perPage: $perPage) {
            order,
            page,
            perPage,
            rows {
                id
                name
                estimatedHours
                price
                workedHours
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
                projectId,
            },
            order,
            page,
            perPage,
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
        {withProject && (
            <Table.Column name="project.name" label="Project" getLink={task => `/projects/${task.project?.id}`} />
        )}
        <Table.Column name="estimatedHours" label="Estimated hours" align="right" type="hours" />
        <Table.Column name="workedHours" label="Worked hours" align="right" type="hours" />
        <Table.Column name="price" align="right" />
    </Table>;

}