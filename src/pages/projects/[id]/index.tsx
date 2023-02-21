import { Summary } from '@/components';
import { usePage } from '@/contexts/Page';
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

export default function ProjectView() {

    const [project, setProject] = useState<Project | null>(null);
    const page = usePage();

    const query = useQuery<ProjectQuery>(gql`query($id: ID!) {
        project(id: $id) {
            billing
            id
            name
            status
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

    return <Summary entity={project}>
        <Summary.Field name="id" label="ID" />
        <Summary.Field name="name" />
        <Summary.Field name="client.name" getLink={`/clients/${project?.client.id}`} />
        <Summary.Field name="billing" />
        <Summary.Field name="status" />
    </Summary>;

}