import { Card } from '@/components';
import { gql, useQuery } from '@apollo/client';

export default function Client({ id }: ClientSummaryProps) {

    const query = useQuery<GetClientQuery>(gql`query($id: ID!) {
        getClient(id: $id) {
            id
            name
            email
        }
    }`, {
        variables: {
            id,
        },
    });

    const client = query.data?.getClient;

    return <Card loading={query.loading} title="Clients">
        <table>
            <tbody>
                <tr>
                    <th>
                        ID
                    </th>
                    <td>
                        {client?.id}
                    </td>
                </tr>
                <tr>
                    <th>
                        Name
                    </th>
                    <td>
                        {client?.name}
                    </td>
                </tr>
                <tr>
                    <th>
                        Email
                    </th>
                    <td>
                        {client?.email}
                    </td>
                </tr>
            </tbody>
        </table>
    </Card>;

}