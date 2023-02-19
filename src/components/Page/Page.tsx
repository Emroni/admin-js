import { Box } from '@mui/material';
import Head from 'next/head';

export default function Page({ children, title }: PageProps) {

    return <>
        <Head>
            <title>
                Admin | {title}
            </title>
        </Head>
        <Box flex={1} overflow="auto">
            <Box component="main" padding={4}>
                {children}
            </Box>
        </Box>
    </>;

}