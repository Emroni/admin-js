import { Box, Card as MuiCard, CardContent, CardHeader, LinearProgress } from '@mui/material';
import { Children } from 'react';

export default function Card({ action, children, loading, title }: CardProps) {

    return <Box position="relative">
        {loading && (
            <Box left={0} position="absolute" top={0} width="100%" zIndex={1}>
                <LinearProgress />
            </Box>
        )}
        <MuiCard>
            <CardHeader action={action} title={title} />
            {Children.map(children, (child, index) => (
                <CardContent key={index}>
                    {child}
                </CardContent>
            ))}
        </MuiCard>
    </Box>;

}