import { Table } from '@/components';
import { gql, useQuery } from '@apollo/client';

export default function ProjectsTable({ clientId }: ProjectsTableProps) {

    const withClient = !clientId;

    const query = useQuery<ProjectsQuery>(gql`query ($filter: ProjectFilter, $withClient: Boolean!) {
        projects (filter: $filter) {
            billing
            id
            name
            status
            client @include(if: $withClient) {
                id
                name
            }
        }
    }`, {
        variables: {
            filter: {
                clientId,
            },
            withClient,
        },
    });

    return <Table rows={query.data?.projects} title="Projects">
        <Table.Column name="id" label="ID" />
        <Table.Column name="name" getLink={project => `/projects/${project.id}`} />
        {withClient && (
            <Table.Column name="client.name" label="Client" getLink={project => `/clients/${project.client.id}`} />
        )}
        <Table.Column name="billing" />
        <Table.Column name="status" />
    </Table>;

}