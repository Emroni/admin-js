import { gql, useMutation } from '@apollo/client';
import { PlayArrow, Stop } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';

export default function TaskTimer({ taskId, value }: TaskTimerProps) {

    const [interval, setInterval] = useState<number | null>(null);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState('00');
    const [start, setStart] = useState<dayjs.Dayjs | null>(null);

    const [mutate, mutation] = useMutation(gql`mutation($id: ID!, $input: TaskFields) {
        taskUpdate (id: $id, input: $input) {
            id
            timer
        }
    }`);

    useEffect(() => {
        // Get starting date
        const newStart = value ? dayjs.utc(value) : null;
        setStart(newStart);

        // Get initial interval
        const newInterval = value ? 1 : null;
        setInterval(newInterval);
    }, [
        value,
    ]);

    useInterval(() => {
        // Trigger tick
        handleTick();

        // Update interval
        if (interval === 1) {
            setInterval(1000 * 60);
        }
    }, interval);

    function handleTick() {
        if (start) {
            // Get difference between start and now in minutes
            const difference = -start.diff(undefined, 'minute');

            // Get hours
            const newHours = Math.floor(difference / 60);
            setHours(newHours);

            // Get minutes
            const newMinutes = Math.floor(difference - 60 * newHours).toString().padStart(2, '0');
            setMinutes(newMinutes);
        }
    }

    async function handleToggle() {
        await mutate({
            variables: {
                id: taskId,
                input: {
                    timer: start ? null : new Date(),
                },
            },
        });
        mutation.client.reFetchObservableQueries();
    }

    return <Box whiteSpace="nowrap">
        <IconButton edge="start" size="small" onClick={handleToggle}>
            {value ? (
                <Stop color="error" />
            ) : (
                <PlayArrow color="success" />
            )}
        </IconButton>
        {value && <>
            {hours}
            <Typography color="grey.400" component="span" fontSize="inherit">
                :
            </Typography>
            {minutes}
        </>}
    </Box>;
}