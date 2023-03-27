import { Dashboard, People, Receipt, Task, Timer, Work } from '@mui/icons-material';
import { Box, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NavigationTimer from '../NavigationTimer/NavigationTimer';

export default function Navigation() {

    const [items, setItems] = useState<NavigationItem[]>([]);
    const router = useRouter();

    useEffect(() => {
        const newItems = [
            { icon: <Dashboard />, path: '/', title: 'Dashboard' },
            { icon: <People />, path: '/clients', title: 'Clients' },
            { icon: <Receipt />, path: '/invoices', title: 'Invoices' },
            { icon: <Work />, path: '/projects', title: 'Projects' },
            { icon: <Task />, path: '/tasks', title: 'Tasks' },
            { icon: <Timer />, path: '/times', title: 'Times' },
        ].map(item => ({
            ...item,
            selected: item.path === '/' ? (item.path === router.pathname) : router.pathname.startsWith(item.path),
        }));
        setItems(newItems);
    }, [
        router.pathname,
    ]);

    return <Box bgcolor="grey.900" display="flex" flexDirection="column" height="100vh" justifyContent="space-between" paddingY={1}>
        <MenuList disablePadding>
            {items.map((item, index) => (
                <MenuItem key={index} selected={item.selected} onClick={() => router.push(item.path)}>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                </MenuItem>
            ))}
        </MenuList>
        <NavigationTimer />
    </Box>;

}