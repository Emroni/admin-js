import { Menu, Summary } from '@/components';
import { usePage } from '@/contexts/Page/Page';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Delete, Edit } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function BankAccountView() {

    const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);
    const page = usePage();
    const router = useRouter();

    const query = useQuery<BankAccountQuery>(gql`query($id: Int!) {
        bankAccount(id: $id) {
            amount
            currency
            deletable
            id
            name
        }
    }`, {
        variables: {
            id: page.query.id,
        },
    });

    const [mutate, mutation] = useMutation(gql`mutation($id: Int!) {
        bankAccountDelete (id: $id) {
            id
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

    async function handleDelete() {
        if (bankAccount && confirm('Are you sure you want to delete this bank account?')) {
            await mutate({
                variables: {
                    id: bankAccount?.id,
                },
            });
            mutation.client.clearStore();
            router.push('/bank-accounts');
        }
    }

    const action = <Menu>
        <Menu.Item icon={Edit} label="Edit" link={`/bank-accounts/${bankAccount?.id}/edit`} />
        <Menu.Item color="error" disabled={!bankAccount?.deletable} icon={Delete} label="Delete" onClick={handleDelete} />
    </Menu>;

    return <>
        <Summary action={action} entity={bankAccount} loading={mutation.loading}>
            <Summary.Field name="name" />
            <Summary.Field name="amount" currencyName={bankAccount?.currency} type="money" />
        </Summary>
    </>;

}