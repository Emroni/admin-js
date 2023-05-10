import { Login } from '@/components';
import { PageProvider } from '@/contexts/Page/Page';
import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import theme from '../theme';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
dayjs.extend(utc);

export default function App({ Component, pageProps }: AppProps) {

    const [authenticated, setAuthenticated] = useState(false);
    const [client, setClient] = useState<ApolloClient<any> | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // Check stored token
        if (localStorage.getItem('token')) {
            setAuthenticated(true);
        }

        setReady(true);
    }, []);

    useEffect(() => {
        // Get auth link
        const authLink = setContext((_, { headers }) => {
            const token = localStorage.getItem('token');
            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : '',
                },
            };
        });

        // Get error link
        const errorLink = onError(({ graphQLErrors }) => {
            graphQLErrors?.forEach(error => console.error(error.message));
        });

        // Get http link
        const httpLink = createHttpLink({
            uri: '/api/graphql',
        });

        // Get client
        const newCient = new ApolloClient({
            cache: new InMemoryCache(),
            link: from([authLink, errorLink, httpLink]),
        });
        setClient(newCient);
    }, []);

    return <ThemeProvider theme={theme}>
        <CssBaseline />
        {authenticated && client && ready && (
            <ApolloProvider client={client}>
                <PageProvider>
                    <Component {...pageProps} />
                </PageProvider>
            </ApolloProvider>
        )}
        {!authenticated && ready && (
            <Login onAuthenticated={() => setAuthenticated(true)} />
        )}
    </ThemeProvider >;

}