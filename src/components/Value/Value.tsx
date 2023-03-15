import { CURRENCIES } from '@/constants';
import { LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Value({ currency, options, type, value }: ValueProps) {

    const [color, setColor] = useState<any>(undefined);
    const [content, setContent] = useState<any>(undefined);

    useEffect(() => {
        // Prepare color and content
        let newColor = value ? undefined : 'grey.400';
        let newContent = value;

        // Check type
        if (Array.isArray(value)) {
            // Get array length
            newContent = value.length;

        } else if (options) {
            // Get option value
            const option = options.find(option => option.value === value || option.id === value || option.name === value);
            newContent = option?.label || option?.name || value;

        } else if (type === 'duration') {
            // Get duration
            newContent = value?.split(':') || ['0', '00'];
            if (value === '0:00') {
                newColor = 'grey.400';
            }

        } else if (type === 'money') {
            // Get money
            const val = parseFloat(value);
            const symbol = CURRENCIES.find(c => c.name === currency)?.symbol || '';
            newContent = (isNaN(val) ? 0 : val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).split('.');
            newContent.unshift(symbol);

        } else if (type === 'progress') {
            // Get progress
            newContent = 100 * value;
            newColor = value && (value <= 1 ? 'success' : 'error') || 'inherit';
        }

        // Set color and content
        setColor(newColor);
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

    if (type === 'duration') {
        return <Typography color={color} component="span" fontSize="inherit">
            {content?.[0]}
            <Typography color="grey.200" component="span" fontSize="smaller">
                :
            </Typography>
            {content?.[1]}
        </Typography>;

    } else if (type === 'money') {
        return <>
            <Typography color="grey.400" component="span" fontSize="smaller" marginRight={0.5}>
                {content[0]}
            </Typography>
            <Typography color={color} component="span" fontSize="inherit">
                {content[1]}
            </Typography>
            <Typography color="grey.400" component="span" fontSize="smaller">
                .{content[2]}
            </Typography>
        </>;

    } else if (type === 'progress') {
        return <LinearProgress color={color} value={content} variant="determinate" />;
    }

    return content;

}