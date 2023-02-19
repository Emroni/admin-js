import { Card, Page } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Link } from '@mui/material';
import NextLink from 'next/link';

export default function Clients() {

    const query = useQuery<GetClientsQuery>(gql`query {
        getClients {
            id
            name
            email
        }
    }`);

    return <Page title="Clients">
        <Card loading={query.loading} title="Clients">
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
                            Email
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {query.data?.getClients.map((client, index) => (
                        <tr key={index}>
                            <td>
                                {client.id}
                            </td>
                            <td>
                                <Link component={NextLink} href={`/clients/${client.id}`}>
                                    {client.name}
                                </Link>
                            </td>
                            <td>
                                {client.email}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    </Page>;

}