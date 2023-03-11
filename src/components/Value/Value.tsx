import { CURRENCIES } from '@/constants';
import { hoursToTime } from '@/helpers';
import { LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Value({ currency, options, type, value }: ValueProps) {

    const [content, setContent] = useState<any>(undefined);
    const [currencySymbol, setCurrencySymbol] = useState('');
    const [money, setMoney] = useState<string | null>(null);

    useEffect(() => {
        // Get content
        let newContent = value;

        // Check array
        if (Array.isArray(newContent)) {
            newContent = newContent.length;
        }

        // Check type
        if (type === 'hours') {
            newContent = hoursToTime(newContent);
        } else if (type === 'money') {
            // Get currency symbol
            const newCurrencySymbol = CURRENCIES.find(c => c.name === currency)?.symbol || '';
            setCurrencySymbol(newCurrencySymbol);

            // Get money
            const newMoney = (parseFloat(newContent) - parseInt(newContent)).toFixed(2).slice(1);
            setMoney(newMoney);
        }

        // Check options
        if (options) {
            const option = options.find(option => option.value === newContent || option.id === newContent || option.name === newContent);
            if (option) {
                newContent = option.label || option.name || newContent;
            }
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
                {currencySymbol}
            </Typography>
            {parseInt(content)}
            <Typography color="grey.400" component="small" fontSize="smaller">
                {money}
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