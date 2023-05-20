import { Form } from '@/components';
import { CURRENCIES } from '@/constants';
import { usePage } from '@/contexts/Page/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function BankAccountEdit() {

    const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);
    const page = usePage();
    const router = useRouter();

    const query = useQuery<BankAccountQuery>(gql`query($id: Int!) {
        bankAccount(id: $id) {
            amount
            currency
            id
            name
        }
    }`, {
        variables: {
            id: page.query.id,
        },
    });

    const [mutate, mutation] = useMutation(gql`mutation($id: Int!, $input: BankAccountFields) {
        bankAccountUpdate (id: $id, input: $input) {
            amount
            currency
            id
            name
        }
    }`);

    useEffect(() => {
        // Get bankAccount
        const newBankAccount = query.data?.bankAccount || null;
        setBankAccount(newBankAccount);

        // Set page name
        page.setName(newBankAccount?.name);
    }, [
        query.data,
        page,
    ]);

    async function handleSubmit(values: IndexedObject) {
        const result = await mutate({
            variables: {
                id: bankAccount?.id,
                input: values,
            },
        });
        router.push(`/bank-accounts/${result.data.bankAccountUpdate.id}`);
    }

    return <Form initialValues={bankAccount} loading={!bankAccount || mutation.loading} title={`Edit ${bankAccount?.name}`} onSubmit={handleSubmit}>
        <Form.Field name="name" required />
        <Form.Field name="currency" options={CURRENCIES} required />
        <Form.Field name="amount" required type="number" />
    </Form>;

}