import { Box, Card as MuiCard, CardContent, CardHeader, Divider, LinearProgress } from '@mui/material';
import { CSSProperties, useEffect, useState } from 'react';

export default function Card({ action, children, loading, title }: CardProps) {

    const [contentStyles, setContentStyles] = useState<CSSProperties>({});

    useEffect(() => {
        const newContentStyles: CSSProperties = loading ? {
            opacity: 0.7,
            pointerEvents: 'none',
        } : {};
        setContentStyles(newContentStyles);
    }, [
        loading,
    ]);

    return <Box position="relative">
        {loading && (
            <Box left={0} position="absolute" top={0} width="100%" zIndex={1}>
                <LinearProgress />
            </Box>
        )}
        <MuiCard>
            <CardHeader action={action} title={title} />
            <Divider />
            <CardContent sx={contentStyles}>
                {children}
            </CardContent>
        </MuiCard>
    </Box>;

}