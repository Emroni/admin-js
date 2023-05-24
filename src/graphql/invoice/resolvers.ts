import { getDurationMinutes, getHoursDuration, parseFilterIds, parseOrder } from '@/helpers';
import dayjs from 'dayjs';
import { prisma } from '../';

export const model = {
    bankAccount: (parent: Invoice) => parent.bankAccountId ? prisma.bankAccount.findUnique({
        where: {
            id: parent.bankAccountId,
        },
    }) : null,
    client: (parent: Invoice) => prisma.client.findUnique({
        where: {
            id: parent.clientId,
        },
    }),
    deletable: (parent: Invoice) => model.times(parent).then(times => !times.length),
    dueDate: (parent: Invoice) => dayjs.utc(parent.sentDate).add(2, 'week'),
    dueDays: (parent: Invoice) => model.dueDate(parent).diff(undefined, 'day'),
    name: (parent: Invoice) => parent.number || `#${parent.id}`,
    projects: (parent: Invoice) => model.tasks(parent).then(tasks => {
        return prisma.project.findMany({
            where: {
                id: {
                    in: tasks.map(task => task.projectId),
                },
            },
        });
    }),
    tasks: (parent: Invoice) => model.times(parent).then(times => {
        return prisma.task.findMany({
            where: {
                id: {
                    in: times.map(time => time.taskId),
                },
            },
        });
    }),
    times: (parent: Invoice) => prisma.time.findMany({
        where: {
            invoiceId: parent.id,
        },
    }),
    workedDuration: (parent: Invoice) => model.workedHours(parent).then(getHoursDuration),
    workedHours: (parent: Invoice) => model.times(parent).then(times => {
        return times.reduce((total, time) => total + getDurationMinutes(time.duration), 0) / 60;
    }),
};

export const queries = {
    invoice: (_parent: any, args: GraphqlGetArgs) => prisma.invoice.findUnique({
        where: {
            id: args.id,
        },
    }),
    invoices: async (_parent: any, args: GraphqlGetArgs) => ({
        order: args.order || 'id desc',
        page: args.page,
        perPage: args.perPage,
        rows: await prisma.invoice.findMany({
            orderBy: parseOrder('id desc', args.order),
            skip: (args.page && args.perPage && (args.page * args.perPage)),
            take: args.perPage,
            where: parseFilter(args.filter),
        }),
        total: await prisma.invoice.count({
            where: parseFilter(args.filter),
        }),
    }),
};

export const mutations = {
    invoiceCreate: (_parent: any, args: GraphqlCreateArgs<InvoiceFields>) => prisma.invoice.create({
        data: parseInput(args.input),
    }),
    invoiceDelete: (_parent: any, args: GraphqlDeleteArgs) => prisma.invoice.delete({
        where: {
            id: args.id,
        },
    }),
    invoiceUpdate: (_parent: any, args: GraphqlUpdateArgs<InvoiceFields>) => prisma.invoice.update({
        data: parseInput(args.input, true),
        where: {
            id: args.id,
        },
    }),
};


function parseFilter(filter?: InvoicesFilter) {
    const where: any = {
        ...filter,
    };

    if (where.projectId) {
        where.times = {
            some: {
                task: {
                    projectId: where.projectId,
                }
            },
        };
        delete where.projectId;
    }

    if (where.taskId) {
        where.times = {
            some: {
                taskId: where.taskId,
            },
        };
        delete where.taskId;
    }

    if (where.clientId) {
        where.clientId = parseFilterIds(where?.clientId);
    }

    return where;
}

function parseInput(input: Partial<InvoiceFields>, update?: boolean) {
    return {
        ...input,
        bankAccount: input.bankAccountId ? {
            connect: {
                id: input.bankAccountId,
            },
        } : undefined,
        bankAccountId: undefined,
        client: input.clientId ? {
            connect: {
                id: input.clientId,
            },
        } : undefined,
        clientId: undefined,
        times: input.timesIds ? {
            set: update ? [] : undefined,
            connect: input.timesIds.map(id => ({
                id: Number(id),
            })),
        } : undefined,
        timesIds: undefined,
    } as any;
}