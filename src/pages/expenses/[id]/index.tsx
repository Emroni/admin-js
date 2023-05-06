import { Menu, Summary } from '@/components';
import { usePage } from '@/contexts/Page/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Delete, Edit } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ExpenseView() {

    const [expense, setExpense] = useState<Expense | null>(null);
    const page = usePage();
    const router = useRouter();

    const query = useQuery<ExpenseQuery>(gql`query($id: Int!) {
        expense(id: $id) {
            active
            amount
            currency
            date
            deletable
            id
            name
            nextDate
            repeats
            type
        }
    }`, {
        variables: {
            id: page.query.id,
        },
    });

    const [mutate, mutation] = useMutation(gql`mutation($id: Int!) {
        expenseDelete (id: $id) {
            id
        }
    }`);

    useEffect(() => {
        // Get expense
        const newExpense = query.data?.expense || null;
        setExpense(newExpense);

        // Set page name
        page.setName(newExpense?.name);
    }, [
        query.data,
        page,
    ]);

    async function handleDelete() {
        if (expense && confirm('Are you sure you want to delete this expense?')) {
            await mutate({
                variables: {
                    id: expense?.id,
                },
            });
            mutation.client.clearStore();
            router.push('/expenses');
        }
    }

    const action = <Menu>
        <Menu.Item icon={Edit} label="Edit" link={`/expenses/${expense?.id}/edit`} />
        <Menu.Item color="error" disabled={!expense?.deletable} icon={Delete} label="Delete" onClick={handleDelete} />
    </Menu>;

    return <>
        <Summary action={action} entity={expense} loading={mutation.loading}>
            <Summary.Field name="active" type="boolean" />
            <Summary.Field name="name" />
            <Summary.Field name="type" />
            <Summary.Field name="date" />
            <Summary.Field name="nextDate" />
            <Summary.Field name="repeats" />
            <Summary.Field name="amount" currencyName={expense?.currency} type="money" />
        </Summary>
    </>;

}