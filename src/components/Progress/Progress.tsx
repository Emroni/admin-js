import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Progress({ value }: ProgressProps) {

    const [amount, setAmount] = useState(0);
    const [color, setColor] = useState<any>(undefined);

    useEffect(() => {
        // Get amount
        const newAmount = 100 * (value || 0);
        setAmount(newAmount);

        // Get color
        const newColor = value && (value <= 1 ? 'success' : 'error') || 'inherit';
        setColor(newColor);
    }, [
        value,
    ]);

    return <LinearProgress color={color} value={amount} variant="determinate" />;

}