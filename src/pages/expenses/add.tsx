import { Form } from '@/components';
import { CURRENCIES } from '@/constants';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

export default function ExpenseAdd() {

    const router = useRouter();

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
        <Form.Field name="active" required />
        <Form.Field name="name" required />
        <Form.Field name="type" required/>
        <Form.Field name="date" required/>
        <Form.Field name="currency" options={CURRENCIES} required/>
        <Form.Field name="repeats" required/>
        <Form.Field name="amount"  required type="number" />
    </Form>;

}