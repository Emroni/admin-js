import { Card, Page } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Link } from '@mui/material';
import NextLink from 'next/link';

export default function Projects() {

    const query = useQuery<ProjectsQuery>(gql`query {
        projects {
            billing
            id
            name
            status
            client {
                id
                name
            }
        }
    }`);

    return <Page title="Projects">
        <Card loading={query.loading} title="Projects">
            <table>
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Client
                        </th>
                        <th>
                            Billing
                        </th>
                        <th>
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {query.data?.projects.map((project, index) => (
                        <tr key={index}>
                            <td>
                                {project.id}
                            </td>
                            <td>
                                <Link component={NextLink} href={`/projects/${project.id}`}>
                                    {project.name}
                                </Link>
                            </td>
                            <td>
                                <Link component={NextLink} href={`/clients/${project.client.id}`}>
                                    {project.client.name}
                                </Link>
                            </td>
                            <td>
                                {project.billing}
                            </td>
                            <td>
                                {project.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    </Page>;

}