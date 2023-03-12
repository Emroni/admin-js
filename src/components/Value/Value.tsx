import { CURRENCIES } from '@/constants';
import { hoursToTime } from '@/helpers';
import { LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Value({ currency, options, type, value }: ValueProps) {

    const [content, setContent] = useState<any>(undefined);
    const [money, setMoney] = useState<string[] | null>(null);
    const [moneySymbol, setMoneySymbol] = useState('');

    useEffect(() => {
        // Prepare content
        let newContent = value;

        // Check type
        if (Array.isArray(value)) {
            newContent = value.length;

        } else if (options) {
            const option = options.find(option => option.value === value || option.id === value || option.name === value);
            newContent = option?.label || option?.name || value;

        } else if (type === 'hours') {
            newContent = hoursToTime(value);

        } else if (type === 'money') {
            // Get money
            const val = parseFloat(value);
            const newMoney = (isNaN(val) ? 0 : val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).split('.');
            setMoney(newMoney);

            // Get money symbol
            const newMoneySymbol = CURRENCIES.find(c => c.name === currency)?.symbol || '';
            setMoneySymbol(newMoneySymbol);
        }

        // Set content
        setContent(newContent);
    }, [
        currency,
        options,
        type,
        value,
    ]);

    if (money) {
        return <>
            <Typography color="grey.400" component="small" fontSize="smaller" marginRight={0.5}>
                {moneySymbol}
            </Typography>
            {money[0]}
            <Typography color="grey.400" component="small" fontSize="smaller">
                .{money[1]}
            </Typography>
        </>;

    } else if (type === 'progress') {
        return <LinearProgress color={value && (value <= 1 ? 'success' : 'error') || 'inherit'} value={value * 100} variant="determinate" />;
    }

    if (content === null || content === undefined) {
        return <span>&nbsp;</span>;
    }

    return content;

}