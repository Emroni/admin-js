import { getDurationHours, parseFilterIds, parseNumber, parseOrder } from '@/helpers';
import { GraphQLError } from 'graphql';
import { prisma } from '../';

export const model = {
    client: (parent: Time) => model.project(parent).client(),
    deletable: () => true, // TODO: Resolve deletable
    currency: (parent: Time) => model.task(parent).then(task => task?.currency),
    earnings: (parent: Time) => model.task(parent).then(task => task?.rate ? model.hours(parent) * task.rate : 0),
    hours: (parent: Time) => getDurationHours(parent.duration as unknown as Date), // TODO: Is there a better way to do this?
    invoice: (parent: Invoice) => prisma.invoice.findUnique({
        where: {
            id: parseNumber(parent.invoiceId),
        },
    }),
    project: (parent: Time) => model.task(parent).project(),
    task: (parent: Time) => prisma.task.findUnique({
        where: {
            id: parseNumber(parent.taskId),
        },
    }),
};

export const queries = {
    time: (_parent: any, args: GraphqlGetArgs) => prisma.time.findUnique({
        where: {
            id: parseNumber(args.id),
        },
    }),
    times: async (_parent: any, args: GraphqlGetArgs) => ({
        order: args.order || 'id desc',
        page: args.page,
        perPage: args.perPage,
        rows: await prisma.time.findMany({
            orderBy: parseOrder('id desc', args.order),
            skip: (args.page && args.perPage && (args.page * args.perPage)),
            take: args.perPage,
            where: parseFilter(args.filter),
        }),
        total: await prisma.time.count({
            where: parseFilter(args.filter),
        }),
    }),
};

export const mutations = {
    timeCreate: async (_parent: any, args: GraphqlCreateArgs<TimeFields>) => {
        // Get existing time
        const time = await prisma.time.findFirst({
            where: {
                date: args.input.date,
                taskId: parseNumber(args.input.taskId),
            },
        });

        // Throw error if exists
        if (time) {
            throw new GraphQLError('Time already exists', {
                extensions: {
                    code: 'ALREADY_EXISTS',
                },
            });
        }

        // Create new
        return prisma.time.create({
            data: parseInput(args.input),
        });
    },
    timeDelete: (_parent: any, args: GraphqlDeleteArgs) => prisma.time.delete({
        where: {
            id: parseNumber(args.id),
        },
    }),
    timeUpdate: (_parent: any, args: GraphqlUpdateArgs<TimeFields>) => prisma.time.update({
        data: parseInput(args.input),
        where: {
            id: parseNumber(args.id),
        },
    }),
};

function parseFilter(filter?: TimesFilter) {
    const where: any = {
        ...filter,
    };

    if (where.clientId) {
        where.task = {
            project: {
                clientId: parseFilterIds(where.clientId),
            },
        };
        delete where.clientId;
    }

    if (where.invoiceId) {
        where.invoiceId = parseFilterIds(where?.invoiceId);
    }

    if (where.projectId) {
        where.task = {
            projectId: parseFilterIds(where.projectId),
        };
        delete where.projectId;
    }

    if (where.taskId) {
        where.taskId = parseFilterIds(where?.taskId);
    }

    return where;
}

function parseInput(input: Partial<TimeFields>) {
    return {
        ...input,
        task: input.taskId ? {
            connect: {
                id: parseNumber(input.taskId),
            },
        } : undefined,
        taskId: undefined,
    } as any;
}