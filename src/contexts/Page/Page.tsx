import { Navigation } from '@/components';
import { Box, capitalize } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

export const PageContext = createContext<PageState>({} as PageState);

export const usePage = () => useContext(PageContext);

export function PageProvider({ children }: PageProps) {

    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [titlePrefix, setTitlePrefix] = useState('');
    const [query, setQuery] = useState<IndexedObject>({});
    const [title, setTitle] = useState('Admin');
    const router = useRouter();

    useEffect(() => {
        // Get query
        const newQuery: IndexedObject = {};
        Object.entries(router.query).forEach(([key, value]) => {
            let val: any = value;
            if (typeof value === 'string') {
                val = parseInt(value);
            }
            newQuery[key] = val;
        });
        setQuery(newQuery);

        // Get category
        const newCategory = capitalize(router.pathname.split('/')[1]);
        setCategory(newCategory);

        // Reset name
        setName('');
    }, [
        router.pathname,
        router.query,
    ]);

    useEffect(() => {
        // Get title
        const newTitle = ['Admin', category, name].filter(segment => segment).join(' › ');
        setTitle(newTitle);
    }, [
        category,
        name,
    ]);

    const state = {
        pathname: router.pathname,
        query,
        setName: (name?: string | null) => setName(name || ''),
        setTitlePrefix: (titlePrefix?: string | null) => setTitlePrefix(titlePrefix || ''),
    };

    return <PageContext.Provider value={state}>
        <Head>
            <title>
                {titlePrefix}{titlePrefix ? ' | ' : ''}{title}
            </title>
        </Head>
        <Box display="flex" height="100vh" overflow="hidden">
            <Navigation />
            <Box component="main" flex={1} overflow="auto">
                <Box display="flex" flexDirection="column" flexGrow={1} gap={4} padding={4}>
                    {children}
                </Box>
            </Box>
        </Box>
    </PageContext.Provider>;

}