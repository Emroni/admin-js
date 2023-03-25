import { TaskTimer } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Box } from '@mui/material';

export default function NavigationTimer() {

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

    const { taskTimer } = taskTimerQuery.data || {};

    if (!taskTimer) {
        return null;
    }

    return <Box paddingX={1} title={`${taskTimer.client.name} › ${taskTimer.project.name} › ${taskTimer.name}`}>
        <TaskTimer prefixTitle taskId={taskTimer.id} value={taskTimer.timer} />
    </Box>;

}
