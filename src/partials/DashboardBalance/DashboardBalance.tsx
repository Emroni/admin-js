import { Card } from '@/components';
import { CURRENCIES } from '@/constants';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Grid, InputAdornment, TextField } from '@mui/material';
import { Fragment } from 'react';

export default function DashboardBalance() {

    const query = useQuery<BankAccountsQuery>(gql`query {
        bankAccounts {
            rows {
                amount
                currency
                id
                name
            }
        }
    }`);

    const [mutate] = useMutation(gql`mutation($id: Int!, $input: BankAccountFields) {
        bankAccountUpdate (id: $id, input: $input) {
            amount
            currency
            id
            name
        }
    }`);

    function handleChange(bankAccount: BankAccount, value: string) {
        mutate({
            variables: {
                id: bankAccount.id,
                input: {
                    amount: parseFloat(value),
                    currency: bankAccount.currency,
                    name: bankAccount.name,
                },
            },
        });
    }

    return <Card loading={query.loading} title="Balance">
        <Grid container spacing={1}>
            {query.data?.bankAccounts.rows.map((bankAccount, index) => (
                <Fragment key={index}>
                    <Grid item xs={6}>
                        {bankAccount.name}
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            defaultValue={bankAccount.amount}
                            InputProps={{
                                startAdornment:
                                    <InputAdornment position="start">
                                        {CURRENCIES.find(currency => currency.name === bankAccount.currency)?.symbol}
                                    </InputAdornment>
                            }}
                            type="number"
                            onChange={e => handleChange(bankAccount, e.target.value)}
                        />
                    </Grid>
                </Fragment>
            ))}
        </Grid>
    </Card>;

}
