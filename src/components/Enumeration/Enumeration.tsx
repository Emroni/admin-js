import { Box, Typography } from '@mui/material';

export default function Enumeration({ children, items, list }: EnumerationProps) {

    const Component: any = children;
    
    return <>
        {items?.map((item, index) => (
            <Box component={list ? 'div' : 'span'} key={index} whiteSpace="nowrap">
                <Component {...item} />
                {!list && (index < items.length - 1) && (
                    <Typography component="span" color="grey.400" display="inline-block" marginRight={0.5}>
                        ,
                    </Typography>
                )}
            </Box>
        ))}
    </>;

}