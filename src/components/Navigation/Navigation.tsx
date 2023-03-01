import { Dashboard, People, Task, Work } from '@mui/icons-material';
import { Box, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navigation() {

    const [items, setItems] = useState<NavigationItem[]>([]);
    const router = useRouter();

    useEffect(() => {
        const newItems = [
            { icon: <Dashboard />, path: '/', title: 'Dashboard' },
            { icon: <People />, path: '/clients', title: 'Clients' },
            { icon: <Work />, path: '/projects', title: 'Projects' },
            { icon: <Task />, path: '/tasks', title: 'Tasks' },
        ].map(item => ({
            ...item,
            selected: item.path === '/' ? (item.path === router.pathname) : router.pathname.startsWith(item.path),
        }));
        setItems(newItems);
    }, [
        router.pathname,
    ]);

    return <Box bgcolor="grey.900" height="100vh" overflow="auto">
        <MenuList>
            {items.map((item, index) => (
                <MenuItem key={index} selected={item.selected} onClick={() => router.push(item.path)}>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                </MenuItem>
            ))}
        </MenuList>
    </Box>;

}