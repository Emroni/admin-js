import { Menu, Table } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import { useState } from 'react';

export default function TimesTable({ clientId, defaultPerPage = 10, invoiceId, projectId, taskId }: TimesTableProps) {

    const [order, setOrder] = useState('id desc');
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(defaultPerPage);

    const withTask = !taskId;
    const withProject = !projectId;
    const withClient = !clientId;
    const withInvoice = !invoiceId;
    
    const query = useQuery<TimesQuery>(gql`query ($filter: TimesFilter, $order: String, $page: Int, $perPage: Int, $withClient: Boolean!, $withInvoice: Boolean!, $withProject: Boolean!, $withTask: Boolean!) {
        times (filter: $filter, order: $order, page: $page, perPage: $perPage) {
            order,
            page,
            perPage,
            rows {
                id
                date
                duration
                earnings
                currency
                client @include(if: $withClient) {
                    id
                    name
                }
                invoice @include(if: $withInvoice) {
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
                invoiceId,
                projectId,
                taskId,
            },
            order,
            page,
            perPage,
            withClient,
            withInvoice,
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
        {withInvoice && (
            <Table.Column name="invoice.name" label="Invoice" getLink={invoice => `/invoices/${invoice.invoice?.id}`} />
        )}
        <Table.Column name="date" align="right" />
        <Table.Column name="duration" align="right"/>
        <Table.Column name="earnings" order={false} type="money" />
    </Table>;

}