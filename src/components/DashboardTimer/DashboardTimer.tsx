import { TaskTimer } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Breadcrumbs, Link } from '@mui/material';
import NextLink from 'next/link';
import Card from '../Card/Card';

export default function DashboardTimer() {

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

    return <Card title="Timer">
        <Breadcrumbs>
            <Link component={NextLink} href={`/clients/${taskTimer.client.id}`}>
                {taskTimer.client.name}
            </Link>
            <Link component={NextLink} href={`/projects/${taskTimer.project.id}`}>
                {taskTimer.project.name}
            </Link>
            <Link component={NextLink} href={`/tasks/${taskTimer.id}`}>
                {taskTimer.name}
            </Link>
        </Breadcrumbs>
        <TaskTimer taskId={taskTimer.id} value={taskTimer.timer} />
    </Card>;

}
