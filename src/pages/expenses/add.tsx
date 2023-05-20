import { Form } from '@/components';
import { CURRENCIES } from '@/constants';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

export default function ExpenseAdd() {

    const router = useRouter();

    const query = useQuery<BankAccountsQuery>(gql`query {
        bankAccounts {
            rows {
                id
                name
            }
        }
    }`);

    const [mutate, mutation] = useMutation(gql`mutation($input: ExpenseFields) {
        expenseCreate (input: $input) {
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

    async function handleSubmit(values: IndexedObject) {
        const result = await mutate({
            variables: {
                input: values,
            },
        });
        mutation.client.clearStore();
        router.push(`/expenses/${result.data.expenseCreate.id}`);
    }

    return <Form loading={!!mutation.data || mutation.loading} title="Add Expense" onSubmit={handleSubmit}>
        <Form.Field name="active" type="switch" />
        <Form.Field name="name" required />
        <Form.Field name="type" required/>
        <Form.Field name="fromBankAccountId" label="From" options={query.data?.bankAccounts.rows} required />
        <Form.Field name="toBankAccountId" label="To" options={query.data?.bankAccounts.rows} required />
        <Form.Field name="date" required/>
        <Form.Field name="currency" options={CURRENCIES} required/>
        <Form.Field name="repeats" required/>
        <Form.Field name="amount"  required type="number" />
    </Form>;

}