import { IconButton } from '@mui/material';
import NextLink from 'next/link';

export default function LinkButton({ icon, link }: LinkButtonProps) {

    const IconComponent = icon;

    return <IconButton LinkComponent={NextLink} href={link}>
        <IconComponent />
    </IconButton>;

}