import { Form } from '@/components';
import { CURRENCIES } from '@/constants';
import { usePage } from '@/contexts/Page/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ExpenseEdit() {

    const [expense, setExpense] = useState<Expense | null>(null);
    const page = usePage();
    const router = useRouter();

    const query = useQuery<BankAccountsQuery & ExpenseQuery>(gql`query($id: Int!) {
        bankAccounts {
            rows {
                id
                name
            }
        }
        expense(id: $id) {
            active
            amount
            currency
            date
            id
            name
            repeats
            type
        }
    }`, {
        variables: {
            id: page.query.id,
        },
    });
    
    const [mutate, mutation] = useMutation(gql`mutation($id: Int!, $input: ExpenseFields) {
        expenseUpdate (id: $id, input: $input) {
            active
            amount
            currency
            date
            id
            name
            repeats
            type
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

    async function handleSubmit(values: IndexedObject) {
        const result = await mutate({
            variables: {
                id: expense?.id,
                input: values,
            },
        });
        router.push(`/expenses/${result.data.expenseUpdate.id}`);
    }

    return <Form initialValues={expense} loading={!expense || mutation.loading} title={`Edit ${expense?.name}`} onSubmit={handleSubmit}>
        <Form.Field name="active" type="switch" />
        <Form.Field name="name" required />
        <Form.Field name="type" required />
        <Form.Field name="fromBankAccountId" label="From" options={query.data?.bankAccounts.rows} />
        <Form.Field name="toBankAccountId" label="To" options={query.data?.bankAccounts.rows} />
        <Form.Field name="date" required />
        <Form.Field name="currency" options={CURRENCIES} required />
        <Form.Field name="repeats" required />
        <Form.Field name="amount" required type="number" />
    </Form>;

}