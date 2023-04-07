import { parseDateInterval } from '@/helpers';
import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Value({ options, type, value }: ValueProps) {

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

        } else if (type === 'dateInterval') {
            // Get date interval
            newContent = parseDateInterval(value).label;

        } else if (type === 'progress') {
            // Get progress
            newContent = 100 * value;
            newColor = value && (value <= 1 ? 'success' : 'error') || 'inherit';
        }

        // Set color and content
        setColor(newColor);
        setContent(newContent);
    }, [
        options,
        type,
        value,
    ]);

    if (content === null || content === undefined) {
        return <span>&nbsp;</span>;
    }

    if (type === 'progress') {
        return <LinearProgress color={color} value={content} variant="determinate" />;
    }

    return content;

}