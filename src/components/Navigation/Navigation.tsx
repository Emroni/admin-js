import { gql, useQuery } from '@apollo/client';
import { AccountBalanceWallet, Dashboard, People, Receipt, Sell, Task, Timer, Work } from '@mui/icons-material';
import { Box, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TaskTimer from '../TaskTimer/TaskTimer';

export default function Navigation() {

    const [items, setItems] = useState<NavigationItem[]>([]);
    const router = useRouter();

    const taskTimerQuery = useQuery<TaskTimerQuery>(gql`query {
        taskTimer {
            id
            name
            timer
            client {
                id
                name
            }
            project {
                id
                name
            }
        }
    }`);

    useEffect(() => {
        const newItems = [
            { icon: <Dashboard />, path: '/', title: 'Dashboard' },
            { icon: <People />, path: '/clients', title: 'Clients' },
            { icon: <Receipt />, path: '/invoices', title: 'Invoices' },
            { icon: <Work />, path: '/projects', title: 'Projects' },
            { icon: <Task />, path: '/tasks', title: 'Tasks' },
            { icon: <Timer />, path: '/times', title: 'Times' },
            { icon: <Sell />, path: '/expenses', title: 'Expenses' },
            { icon: <AccountBalanceWallet />, path: '/bank-accounts', title: 'Bank Accounts' },
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
                <MenuItem component={NextLink} href={item.path} key={index} selected={item.selected}>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                </MenuItem>
            ))}
        </MenuList>
        {taskTimerQuery.data?.taskTimer && (
            <Box paddingX={1} title={`${taskTimerQuery.data.taskTimer.client.name} › ${taskTimerQuery.data.taskTimer.project.name} › ${taskTimerQuery.data.taskTimer.name}`}>
                <TaskTimer prefixTitle taskId={taskTimerQuery.data.taskTimer.id} value={taskTimerQuery.data.taskTimer.timer} />
            </Box>
        )}
    </Box>;

}