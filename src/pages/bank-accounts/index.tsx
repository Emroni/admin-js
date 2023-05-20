import { Menu, Table } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import { useState } from 'react';

export default function BankAccounts() {

    const [order, setOrder] = useState('name asc');
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(20);

    const query = useQuery<BankAccountsQuery>(gql`query ($order: String, $page: Int, $perPage: Int) {
        bankAccounts (order: $order, page: $page, perPage: $perPage) {
            order,
            page,
            perPage,
            rows {
                amount
                currency
                id
                name
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
        <Menu.Item icon={Add} label="Add" link="/bank-accounts/add" />
    </Menu>;

    return <Table
        action={action}
        data={query.data?.bankAccounts}
        title="BankAccounts"
        getRowLink={bankAccount => `/bank-accounts/${bankAccount.id}`}
        onOrderChange={handleOrderChange}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
    >
        <Table.Column name="name" />
        <Table.Column name="amount" type="money" />
    </Table>;

}