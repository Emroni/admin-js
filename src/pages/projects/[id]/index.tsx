import { Page, Summary } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Link } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export default function Project() {

    const router = useRouter();
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
            id: parseInt(router.query.id as string),
        },
    });

    const project = query.data?.project;

    return <Page title={project?.name}>
        <Summary entity={project}>
            <Summary.Field name="id" label="ID" />
            <Summary.Field name="name" />
            <Summary.Field name="client">
                <Link component={NextLink} href={`/clients/${project?.client.id}`}>
                    {project?.client.name}
                </Link>
            </Summary.Field>
            <Summary.Field name="billing" />
            <Summary.Field name="status" />
        </Summary>
    </Page>;

}