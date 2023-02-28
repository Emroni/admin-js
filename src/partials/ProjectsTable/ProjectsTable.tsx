import { Menu, Table } from '@/components';
import { PROJECT_BILLING, PROJECT_STATUS } from '@/constants';
import { gql, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';

export default function ProjectsTable({ clientId }: ProjectsTableProps) {

    const withClient = !clientId;

    const query = useQuery<ProjectsQuery>(gql`query ($filter: ProjectsFilter, $withClient: Boolean!) {
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

    const action = <Menu>
        <Menu.Item icon={Add} label="Add" link={'/projects/add' + (clientId ? `?clientId=${clientId}` : '')} />
    </Menu>;

    return <Table action={action} rows={query.data?.projects} title="Projects" getRowLink={project => `/projects/${project.id}`}>
        <Table.Column name="id" label="ID" />
        <Table.Column name="name" />
        {withClient && (
            <Table.Column name="client.name" label="Client" getLink={project => `/clients/${project.client?.id}`} />
        )}
        <Table.Column name="billing" options={PROJECT_BILLING} />
        <Table.Column name="status" options={PROJECT_STATUS}/>
    </Table>;

}