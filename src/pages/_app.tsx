import { PageProvider } from '@/contexts/Page';
import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import theme from '../theme';

dayjs.extend(utc);

export default function App({ Component, pageProps }: AppProps) {

    const [client, setClient] = useState<ApolloClient<any> | null>(null);

    useEffect(() => {
        // Get http link
        const httpLink = createHttpLink({
            uri: '/api/graphql',
        });

        // Get client
        const newCient = new ApolloClient({
            cache: new InMemoryCache(),
            link: from([httpLink]),
        });
        setClient(newCient);
    }, []);

    return <ThemeProvider theme={theme}>
        <CssBaseline />
        {client && (
            <ApolloProvider client={client}>
                <PageProvider>
                    <Component {...pageProps} />
                </PageProvider>
            </ApolloProvider>
        )}
    </ThemeProvider >;

}