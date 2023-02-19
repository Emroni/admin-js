import { Page } from '@/components';
import { gql, useQuery } from '@apollo/client';

export default function Clients() {

    const query = useQuery<getClientsQuery>(gql`query {
        getClients {
            id
            name
            email
        }
    }`);

    return <Page title="Clients">
        Clients
        <table>
            <tr>
                <th>
                    ID
                </th>
                <th>
                    Name
                </th>
                <th>
                    Email
                </th>
            </tr>
            {query.data?.getClients.map((client, index) => (
                <tr key={index}>
                    <td>
                        {client.id}
                    </td>
                    <td>
                        {client.name}
                    </td>
                    <td>
                        {client.email}
                    </td>
                </tr>
            ))}
        </table>
    </Page>;

}