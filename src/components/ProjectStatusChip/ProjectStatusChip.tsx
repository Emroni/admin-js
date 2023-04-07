import { PROJECT_STATUS } from '@/constants';
import { Chip } from '@mui/material';
import { useEffect, useState } from 'react';


export default function ProjectStatusChip({ value }:ProjectStatusChipProps) {

    const [color, setColor] = useState<any>(undefined);
    const [label, setLabel] = useState('');

    useEffect(() => {
        // Get status
        const status = PROJECT_STATUS.find(status => status.value === value);
        
        // Get color
        const newColor = status?.color;
        setColor(newColor);

        // Get label
        const newLabel = status?.label || '';
        setLabel(newLabel);
    }, [
        value,
    ]);

    return <Chip color={color} label={label} size="small" variant="outlined" />;

}