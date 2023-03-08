import { hoursToTime } from '@/helpers';
import { Link } from '@mui/material';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';

export default function Value({ entity, options, type, value, getLink }: ValueProps) {

    const [link, setLink] = useState<string | undefined>(undefined);
    const [content, setContent] = useState(undefined);

    useEffect(() => {
        // Get content
        let newContent = value;

        // Check array
        if (Array.isArray(newContent)) {
            newContent = newContent.length;
        }

        // Check hours
        if (type === 'hours') {
            newContent = hoursToTime(newContent);
        }

        // Check options
        if (options) {
            const option = options.find(option => option.value === newContent || option.id === newContent || option.name === newContent);
            if (option) {
                newContent = option.label || option.name || newContent;
            }
        }

        // Update state
        setContent(newContent);
    }, [
        entity,
        options,
        type,
        value,
    ]);

    useEffect(() => {
        // Get link
        const newLink = typeof getLink === 'function' ? (entity && getLink(entity) || '') : getLink;
        setLink(newLink);
    }, [
        entity,
        getLink,
    ]);

    if (content === null || content === undefined) {
        return <span>&nbsp;</span>;
    }

    if (link) {
        return <Link component={NextLink} href={link}>
            {content}
        </Link>;
    }

    return content;

}