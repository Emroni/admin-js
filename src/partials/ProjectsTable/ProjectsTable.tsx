import { Menu, Table } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';

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

    const menu = <Menu>
        <Menu.Item icon={Add} label="Add" link="/projects/add" />
    </Menu>;

    return <Table menu={menu} rows={query.data?.projects} title="Projects" getRowLink={project => `/projects/${project.id}`}>
        <Table.Column name="id" label="ID" />
        <Table.Column name="name" />
        {withClient && (
            <Table.Column name="client.name" label="Client" getLink={project => `/clients/${project.client?.id}`} />
        )}
        <Table.Column name="billing" />
        <Table.Column name="status" />
    </Table>;

}