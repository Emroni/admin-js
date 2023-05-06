import { CURRENCIES } from '@/constants';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Money({ amount, currencyName }: MoneyProps) {

    const [base, setBase] = useState('0');
    const [cents, setCents] = useState('0');
    const [color, setColor] = useState<string | undefined>(undefined);
    const [currency, setCurrency] = useState<Currency | undefined>(undefined);

    useEffect(() => {
        // Get currency
        const newCurrency = CURRENCIES.find(currency => currency.name === currencyName);
        setCurrency(newCurrency);

        // Get color
        const newColor = amount ? undefined : 'grey.400';
        setColor(newColor);

        // Parse amount
        const value = (amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).split('.');
        setBase(value[0]);
        setCents(value[1]);
    }, [
        amount,
        currencyName,
    ]);

    return <>
        <Typography color="grey.400" component="span" fontSize="smaller" marginRight={0.5}>
            {currency?.symbol}
        </Typography>
        <Typography color={color} component="span" fontSize="inherit">
            {base}
        </Typography>
        <Typography color="grey.400" component="span" fontSize="smaller">
            .{cents}
        </Typography>
    </>;

}