import { Card } from '@/components';
import { gql, useQuery } from '@apollo/client';

export default function Client({ id }: ClientSummaryProps) {

    const query = useQuery<ClientQuery>(gql`query($id: ID!) {
        client(id: $id) {
            id
            name
            email
        }
    }`, {
        variables: {
            id,
        },
    });

    const client = query.data?.client;

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