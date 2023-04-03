import { Menu, Summary } from '@/components';
import { PROJECT_STATUS } from '@/constants';
import { usePage } from '@/contexts/Page';
import { InvoicesTable, TasksTable, TimesTable } from '@/partials';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Delete, Edit } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ProjectView() {

    const [project, setProject] = useState<Project | null>(null);
    const page = usePage();
    const router = useRouter();

    const query = useQuery<ProjectQuery>(gql`query($id: Int!) {
        project(id: $id) {
            currency
            deletable
            earnings
            estimatedDuration
            id
            name
            progress
            status
            workedDuration
            client {
                id
                name
            }
        }
    }`, {
        variables: {
            id: page.query.id,
        },
    });

    const [mutate, mutation] = useMutation(gql`mutation($id: Int!) {
        projectDelete (id: $id) {
            id
        }
    }`);

    useEffect(() => {
        // Get project
        const newProject = query.data?.project || null;
        setProject(newProject);

        // Set page name
        page.setName(newProject?.name);
    }, [
        query.data,
        page,
    ]);

    async function handleDelete() {
        if (project && confirm('Are you sure you want to delete this project?')) {
            await mutate({
                variables: {
                    id: project?.id,
                },
            });
            mutation.client.clearStore();
            router.push(`/clients/${project?.client.id}`);
        }
    }
    
    const action = <Menu>
        <Menu.Item icon={Edit} label="Edit" link={`/projects/${project?.id}/edit`} />
        <Menu.Item color="error" disabled={!project?.deletable} icon={Delete} label="Delete" onClick={handleDelete} />
    </Menu>;

    return <>
        <Summary action={action} entity={project} loading={mutation.loading}>
            <Summary.Field name="name" />
            <Summary.Field name="client.name" label="Client" getLink={`/clients/${project?.client.id}`} />
            <Summary.Field name="status" options={PROJECT_STATUS} />
            <Summary.Field name="earnings" currency={project?.currency} type="money" />
            <Summary.Field name="estimatedDuration" />
            <Summary.Field name="workedDuration" />
            <Summary.Field name="progress" type="progress" />
        </Summary>
        <InvoicesTable projectId={page.query.id} />
        <TasksTable projectId={page.query.id} />
        <TimesTable projectId={page.query.id} />
    </>;

}