import { Chip } from '@mui/material';
import { useEffect, useState } from 'react';


export default function BooleanChip({ value }:BooleanChipProps) {

    const [color, setColor] = useState<any>(undefined);
    const [label, setLabel] = useState('');

    useEffect(() => {
        // Get color
        const newColor = value ? 'success' : 'error';
        setColor(newColor);

        // Get label
        const newLabel = value ? 'Yes' : 'No';
        setLabel(newLabel);
    }, [
        value,
    ]);

    return <Chip color={color} label={label} size="small" variant="outlined" />;

}