import { Menu, Table } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import { useState } from 'react';

export default function Expenses() {

    const [order, setOrder] = useState('name asc');
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(20);

    const query = useQuery<ExpensesQuery>(gql`query ($order: String, $page: Int, $perPage: Int) {
        expenses (order: $order, page: $page, perPage: $perPage) {
            order,
            page,
            perPage,
            rows {
                active
                amount
                currency
                id
                name
                nextDate
                repeats
                type

                fromBankAccount {
                    id
                    name
                }
                toBankAccount {
                    id
                    name
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
        <Menu.Item icon={Add} label="Add" link="/expenses/add" />
    </Menu>;

    return <Table
        action={action}
        data={query.data?.expenses}
        title="Expenses"
        getRowLink={expense => `/expenses/${expense.id}`}
        onOrderChange={handleOrderChange}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
    >
        <Table.Column name="active" type="boolean" />
        <Table.Column name="name" />
        <Table.Column name="type" />
        <Table.Column name="fromBankAccount.name" label="From" getLink={row => `/bank-accounts/${row.fromBankAccount?.id}`} />
        <Table.Column name="toBankAccount.name" label="To" getLink={row => `/bank-accounts/${row.toBankAccount?.id}`} />
        <Table.Column name="nextDate" order={false} />
        <Table.Column name="repeats" />
        <Table.Column name="amount" type="money" />
    </Table>;

}