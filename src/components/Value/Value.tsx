import { CURRENCIES } from '@/constants';
import { LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Value({ currency, options, type, value }: ValueProps) {

    const [content, setContent] = useState<any>(undefined);

    useEffect(() => {
        // Prepare content
        let newContent = value;

        // Check type
        if (Array.isArray(value)) {
            // Get array length
            newContent = value.length;

        } else if (options) {
            // Get option value
            const option = options.find(option => option.value === value || option.id === value || option.name === value);
            newContent = option?.label || option?.name || value;

        } else if (type === 'hours') {
            // Get hours
            const hours = Math.floor(value);
            const minutes = Math.round((value - hours) * 60).toString().padStart(2, '0');
            newContent = value ? [hours, minutes] : 0;

        } else if (type === 'money') {
            // Get money
            const val = parseFloat(value);
            const symbol = CURRENCIES.find(c => c.name === currency)?.symbol || '';
            newContent = (isNaN(val) ? 0 : val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).split('.');
            newContent.unshift(symbol);
        }

        // Set content
        setContent(newContent);
    }, [
        currency,
        options,
        type,
        value,
    ]);

    if (content === null || content === undefined) {
        return <span>&nbsp;</span>;
    }

    if (type === 'hours') {
        return <Typography color={content ? '' : 'grey.400'} component="span" fontSize="inherit">
            {content?.[0] || '0'}
            <Typography color="grey.400" component="small" fontSize="smaller">
                :
            </Typography>
            {content?.[1] || '00'}
        </Typography>;

    } else if (type === 'money') {
        return <>
            <Typography color="grey.400" component="small" fontSize="smaller" marginRight={0.5}>
                {content[0]}
            </Typography>
            {content[1]}
            <Typography color="grey.400" component="small" fontSize="smaller">
                .{content[2]}
            </Typography>
        </>;

    } else if (type === 'progress') {
        return <LinearProgress color={value && (value <= 1 ? 'success' : 'error') || 'inherit'} value={value * 100} variant="determinate" />;
    }

    return content;

}