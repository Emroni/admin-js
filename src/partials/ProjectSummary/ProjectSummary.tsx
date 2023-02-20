import { Card } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Link } from '@mui/material';
import NextLink from 'next/link';

export default function Project({ id }: ProjectSummaryProps) {

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
            id,
        },
    });

    const project = query.data?.project;

    return <Card loading={query.loading} title="Projects">
        <table>
            <tbody>
                <tr>
                    <th>
                        ID
                    </th>
                    <td>
                        {project?.id}
                    </td>
                </tr>
                <tr>
                    <th>
                        Name
                    </th>
                    <td>
                        {project?.name}
                    </td>
                </tr>
                <tr>
                    <th>
                        Client
                    </th>
                    <td>
                        <Link component={NextLink} href={`/clients/${project?.client.id}`}>
                            {project?.client.name}
                        </Link>
                    </td>
                </tr>
                <tr>
                    <th>
                        Billing
                    </th>
                    <td>
                        {project?.billing}
                    </td>
                </tr>
                <tr>
                    <th>
                        Status
                    </th>
                    <td>
                        {project?.status}
                    </td>
                </tr>
            </tbody>
        </table>
    </Card>;

}