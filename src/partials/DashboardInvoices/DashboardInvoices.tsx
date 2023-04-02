import { Menu, Table } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import { Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { Fragment, useEffect, useState } from 'react';

export default function DashboardInvoices() {

    const [data, setData] = useState<GraphqlList | undefined>(undefined);

    const query = useQuery<InvoicesQuery & TimesQuery>(gql`query {
        invoices (filter: { paidDate: null }, order: "id asc", page: 0, perPage: 1000) {
            order,
            page,
            perPage,
            rows {
                amount
                currency
                description
                dueDays
                id
                number
                sentDate
                type
                client {
                    id
                    name
                }
                projects {
                    id
                    name
                }
            }
            total
        }
        times (filter: { invoiceId: null }, order: "id asc", page: 0, perPage: 1000) {
            rows {
                currency
                date
                duration
                earnings
                id
                client {
                    id
                    name
                }
                project {
                    id
                    name
                }
            }
        }
    }`);

    useEffect(() => {
        if (query.data) {
            const { invoices, times } = query.data;

            // Prepare data with invoices
            const newData = {
                order: 'id asc',
                page: 0,
                perPage: 1000,
                rows: invoices.rows.slice(),
                total: invoices.total,
            };

            // Parse times into billables
            const billables: IndexedObject = {};
            times.rows.forEach((time, index) => {
                // Add client
                let billable = billables[time.client.id];
                if (!billable) {
                    billable = billables[time.client.id] = {
                        amount: 0,
                        currency: time.currency,
                        client: time.client,
                        id: invoices.total + index,
                        projects: {},
                    };
                }

                // Parse data
                billable.projects[time.project.id] = time.project;
                billable.amount += time.earnings;
            });

            // Merge billables into data
            Object.values(billables).forEach(billable => {
                newData.rows.push({
                    ...billable,
                    projects: Object.values(billable.projects).sort((a: any, b: any) => a.name < b.name ? -1 : 1),
                });
                newData.total++;
            });

            setData(newData);
        }
    }, [
        query.data,
    ]);

    const action = <Menu>
        <Menu.Item icon={Add} label="Add" link="/invoices/add" />
    </Menu>;

    return <Table
        action={action}
        data={data}
        title="Invoices"
        getRowLink={invoice => invoice.sentDate ? `/invoices/${invoice.id}` : `/invoices/add?clientId=${invoice.client.id}`}
    >
        <Table.Column name="number" />
        <Table.Column name="client.name" label="Client" getLink={invoice => `/clients/${invoice.client?.id}`} />
        <Table.Column name="projects" label="Projects">
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
        <Table.Column name="amount" type="money" />
        <Table.Column name="sentDate" label="Sent" align="right" />
        <Table.Column name="dueDays" label="Due" align="right" />
    </Table>;

}