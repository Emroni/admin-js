import { Menu, Table } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import { Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { Fragment, useState } from 'react';

export default function InvoicesTable({ clientId, defaultPerPage = 10, projectId, taskId }: InvoicesTableProps) {

    const [order, setOrder] = useState('id desc');
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(defaultPerPage);

    const withClient = !clientId;
    const withProjects = !projectId;
    
    const query = useQuery<InvoicesQuery>(gql`query ($filter: InvoicesFilter, $order: String, $page: Int, $perPage: Int, $withClient: Boolean!, $withProjects: Boolean!) {
        invoices (filter: $filter, order: $order, page: $page, perPage: $perPage) {
            order,
            page,
            perPage,
            rows {
                id
                number
                currency
                amount
                type
                description
                sentDate
                paidDate
                client @include(if: $withClient) {
                    id
                    name
                }
                projects @include(if: $withProjects) {
                    id
                    name
                }
            }
            total
        }
    }`, {
        variables: {
            filter: {
                clientId,
                projectId,
                taskId,
            },
            order,
            page,
            perPage,
            withClient,
            withProjects,
        },
    });
    
    function handleOrderChange(order: string | null) {
        const newOrder = order || 'name asc';
        setOrder(newOrder);
    }

    const action = <Menu>
        <Menu.Item icon={Add} label="Add" link={'/invoices/add' + (clientId ? `?clientId=${clientId}` : '')} />
    </Menu>;

    return <Table
        action={action}
        data={query.data?.invoices}
        title="Invoices"
        getRowLink={invoice => `/invoices/${invoice.id}`}
        onOrderChange={handleOrderChange}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
    >
        <Table.Column name="number" />
        {withClient && (
            <Table.Column name="client.name" label="Client" getLink={invoice => `/clients/${invoice.client?.id}`} />
        )}
        {withProjects && (
            <Table.Column name="projects">
                {({ value }: TableColumnChildProps) => value?.map((project: Project, index: number) => (
                    <Fragment key={index}>
                        <Link component={NextLink} href={`/projects/${project.id}`}>
                            {project.name}
                        </Link>
                        {(index < value.length - 1) && (
                            <Typography component="span" color="grey.400" display="inline-block" marginRight={0.5}>
                                ,
                            </Typography>
                        )}
                    </Fragment>
                ))}
            </Table.Column>
        )}
        <Table.Column name="amount" type="money" />
        <Table.Column name="sentDate" />
        <Table.Column name="paidDate" />
    </Table>;

}