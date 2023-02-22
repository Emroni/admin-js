import * as Icons from '@mui/icons-material';
import { IconButton, ListItemIcon, Menu as MuiMenu, MenuItem as MuiMenuItem, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Children, useEffect, useState } from 'react';

export default function Menu({ children }: MenuProps) {

    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
    const [items, setItems] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        // Get items
        const newItems: MenuItem[] = Children.map(children, child => {
            const Icon = child.props.icon;
            return {
                ...child.props,
                icon: <Icon color={child.props.color} fontSize="small" />,
            };
        });
        setItems(newItems);
    }, [
        children,
    ]);

    function handleClick(item: MenuItem) {
        setAnchor(null);
        if (item.onClick) {
            item.onClick(item);
        } else if (item.link) {
            router.push(item.link)
        }
    }

    return <>
        <IconButton onClick={e => setAnchor(e.currentTarget)}>
            <Icons.MoreVert />
        </IconButton>
        <MuiMenu anchorEl={anchor} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} transformOrigin={{ horizontal: 'right', vertical: 'top' }} open={!!anchor} onClose={() => setAnchor(null)}>
            {items.map((item, index) => (
                <MuiMenuItem disabled={item.disabled} key={index} onClick={() => handleClick(item)}>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <Typography color={item.color}>
                        {item.label}
                    </Typography>
                </MuiMenuItem>
            ))}
        </MuiMenu>
    </>;

}

const Item = (_: MenuItem) => null;
Menu.Item = Item;