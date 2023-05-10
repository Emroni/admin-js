import { Enumeration, Menu, Table } from '@/components';
import { gql, useQuery } from '@apollo/client';
import { Add, Circle } from '@mui/icons-material';
import { Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';

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
                id
                client {
                    id
                    name
                }
                earnings {
                    amount
                    currency
                }
                project {
                    id
                    name
                    status
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
            const billables: Map<string, DashboardInvoicesBillable> = new Map();
            times.rows.forEach((time, index) => {
                if (time.project.status === 'in_progress') {
                    time.earnings.forEach(earning => {
                        // Add billable
                        const id = `${time.client.id}-${earning.currency}`;
                        let billable = billables.get(id);
                        if (!billable) {
                            billable = {
                                amount: 0,
                                client: time.client,
                                currency: time.currency,
                                id: -index,
                                projects: new Map<number, Project>(),
                            };
                            billables.set(id, billable);
                        }

                        // Parse data
                        billable.projects.set(time.project.id, time.project);
                        billable.amount += earning.amount;
                    });
                }
            });

            // Merge billables into data
            billables.forEach(billable => {
                newData.rows.push({
                    ...billable,
                    projects: Array.from(billable.projects.values()).sort((a: any, b: any) => a.name < b.name ? -1 : 1),
                } as any);
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
        <Table.Column name="type" label=" " order={false}>
            {({ value }: TableColumnChildProps) => (
                <Typography component="span" fontSize={12} title={value ? 'Sent' : 'Billable'}>
                    <Circle color={value ? 'info' : 'secondary'} fontSize="inherit" />
                </Typography>
            )}
        </Table.Column>
        <Table.Column name="number" order={false} />
        <Table.Column name="client.name" label="Client" getLink={invoice => `/clients/${invoice.client?.id}`} />
        <Table.Column name="projects" order={false}>
            {({ value }: TableColumnChildProps) => (
                <Enumeration items={value}>
                    {(project: Project) => (
                        <Link component={NextLink} href={`/projects/${project.id}`}>
                            {project.name}
                        </Link>
                    )}
                </Enumeration>
            )}
        </Table.Column>
        <Table.Column name="amount" order={false} type="money" />
        <Table.Column name="sentDate" align="right" order={false} />
        <Table.Column name="dueDays" align="right" order={false} />
    </Table>;

}