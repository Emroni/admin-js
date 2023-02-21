import { Box } from '@mui/material';
import Head from 'next/head';

export default function Page({ children, title }: PageProps) {

    return <>
        <Head>
            <title>
                Admin | {title}
            </title>
        </Head>
        <Box component="main" flex={1} overflow="auto">
            <Box display="flex" flexDirection="column" flexGrow={1} gap={4} padding={4}>
                {children}
            </Box>
        </Box>
    </>;

}