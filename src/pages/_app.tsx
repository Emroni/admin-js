import Navigation from '@/components/Navigation/Navigation';
import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import theme from '../theme';

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
                <Box display="flex" height="100vh" overflow="hidden">
                    <Navigation />
                    <Component {...pageProps} />
                </Box>
            </ApolloProvider>
        )}
    </ThemeProvider >;

}