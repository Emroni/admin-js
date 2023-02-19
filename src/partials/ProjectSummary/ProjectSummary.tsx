import { Card } from '@/components';
import { gql, useQuery } from '@apollo/client';

export default function Project({ id }: ProjectSummaryProps) {

    const query = useQuery<GetProjectQuery>(gql`query($id: ID!) {
        getProject(id: $id) {
            id
            name
        }
    }`, {
        variables: {
            id,
        },
    });

    const project = query.data?.getProject;

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
            </tbody>
        </table>
    </Card>;

}