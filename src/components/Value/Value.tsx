import { parseDateInterval } from '@/helpers';
import { useEffect, useState } from 'react';

export default function Value({ options, type, value }: ValueProps) {

    const [content, setContent] = useState<any>(undefined);

    useEffect(() => {
        // Prepare color and content
        let newContent = value;

        // Check type
        if (options) {
            // Get option value
            const option = options.find(option => option.value === value || option.id === value || option.name === value);
            newContent = option?.label || option?.name || value;

        } else if (type === 'dateInterval') {
            // Get date interval
            newContent = parseDateInterval(value).label;
        }

        // Set color and content
        setContent(newContent);
    }, [
        options,
        type,
        value,
    ]);

    

    return content;

}