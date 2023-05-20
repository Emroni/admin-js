import { Form } from '@/components';
import { CURRENCIES } from '@/constants';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

export default function BankAccountAdd() {

    const router = useRouter();

    const [mutate, mutation] = useMutation(gql`mutation($input: BankAccountFields) {
        bankAccountCreate (input: $input) {
            amount
            currency
            id
            name
        }
    }`);

    async function handleSubmit(values: IndexedObject) {
        const result = await mutate({
            variables: {
                input: values,
            },
        });
        mutation.client.clearStore();
        router.push(`/bank-accounts/${result.data.bankAccountCreate.id}`);
    }

    return <Form loading={!!mutation.data || mutation.loading} title="Add BankAccount" onSubmit={handleSubmit}>
        <Form.Field name="name" required />
        <Form.Field name="currency" options={CURRENCIES} required />
        <Form.Field name="amount" required type="number" />
    </Form>;

}