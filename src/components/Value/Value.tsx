import { CURRENCIES } from '@/constants';
import { hoursToTime } from '@/helpers';
import { Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';

export default function Value({ currency, entity, options, type, value, getLink }: ValueProps) {

    const [currencySymbol, setCurrencySymbol] = useState('');
    const [link, setLink] = useState<string | undefined>(undefined);
    const [content, setContent] = useState<any>(undefined);

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
        currency,
        entity,
        options,
        type,
        value,
    ]);

    useEffect(() => {
        // Get currency symbol
        if (currency && type === 'money') {
            const newCurrencySymbol = CURRENCIES.find(c => c.name === currency)?.symbol || '';
            setCurrencySymbol(newCurrencySymbol);
        }
    }, [
        currency,
        type,
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

    if (currencySymbol) {
        return <>
            <Typography color="grey.400" component="small" fontSize="smaller" marginRight={0.5}>
                {currencySymbol}
            </Typography>
            {parseInt(content)}
            <Typography color="grey.400" component="small" fontSize="smaller">
                {(parseFloat(content)-parseInt(content)).toFixed(2).slice(1)}
            </Typography>
        </>;
    }   

    if (link) {
        return <Link component={NextLink} href={link}>
            {content}
        </Link>;
    }

    return content;

}