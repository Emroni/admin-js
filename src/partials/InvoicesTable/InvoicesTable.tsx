import { Menu, Table } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import { useState } from 'react';

export default function InvoicesTable({ clientId, defaultPerPage = 10 }: InvoicesTableProps) {

    const [order, setOrder] = useState('id desc');
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(defaultPerPage);

    const withClient = !clientId;

    const query = useQuery<InvoicesQuery>(gql`query ($filter: InvoicesFilter, $order: String, $page: Int, $perPage: Int, $withClient: Boolean!) {
        invoices (filter: $filter, order: $order, page: $page, perPage: $perPage) {
            order,
            page,
            perPage,
            rows {
                id
                number
                currency
                amount
                type
                description
                sentDate
                paidDate
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
        <Menu.Item icon={Add} label="Add" link={'/invoices/add' + (clientId ? `?clientId=${clientId}` : '')} />
    </Menu>;

    return <Table
        action={action}
        data={query.data?.invoices}
        title="Invoices"
        getRowLink={invoice => `/invoices/${invoice.id}`}
        onOrderChange={handleOrderChange}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
    >
        <Table.Column name="number" />
        {withClient && (
            <Table.Column name="client.name" label="Client" getLink={invoice => `/clients/${invoice.client?.id}`} />
        )}
        <Table.Column name="amount" type="money" />
        <Table.Column name="sentDate" label="Sent" />
        <Table.Column name="paidDate" label="Paid" />
    </Table>;

}