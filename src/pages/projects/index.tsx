import { Card, Page } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Link } from '@mui/material';
import NextLink from 'next/link';

export default function Projects() {

    const query = useQuery<GetProjectsQuery>(gql`query {
        getProjects {
            id
            name
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
                    </tr>
                </thead>
                <tbody>
                    {query.data?.getProjects.map((project, index) => (
                        <tr key={index}>
                            <td>
                                {project.id}
                            </td>
                            <td>
                                <Link component={NextLink} href={`/projects/${project.id}`}>
                                    {project.name}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    </Page>;

}