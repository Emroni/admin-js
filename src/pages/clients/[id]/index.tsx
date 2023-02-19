import { Card, Page } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

export default function Client() {

    const router = useRouter();

    const query = useQuery<GetClientQuery>(gql`query($id: ID!) {
        getClient(id: $id) {
            id
            name
            email
        }
    }`, {
        variables: {
            id: router.query.id,
        },
    });

    const client = query.data?.getClient;

    return <Page title="Client">
        <Card loading={query.loading} title="Clients">
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
        </Card>
    </Page>;

}