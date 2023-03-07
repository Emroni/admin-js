import { parseFilterIds, parseNumber, parseOrder } from '@/helpers';
import { prisma } from '../';
import * as clientResolver from '../client/resolvers';
import * as projectResolver from '../project/resolvers';
import * as taskResolver from '../task/resolvers';

export const model = {
    deletable: () => true, // TODO: Resolve deletable
    client: (parent: Time) => model.project(parent).then(project => {
        return clientResolver.queries.client(null, {
            id: project?.clientId,
        });
    }),
    project: (parent: Time) => model.task(parent).then(task => {
        return projectResolver.queries.project(null, {
            id: task?.projectId,
        });
    }),
    task: (parent: Time) => taskResolver.queries.task(null, {
        id: parent.taskId,
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
    timeCreate: (_parent: any, args: GraphqlCreateArgs<TimeFields>) => prisma.time.create({
        data: parseInput(args.input),
    }),
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

function parseInput(input: TimeFields) {
    return {
        ...input,
        task: {
            connect: {
                id: parseNumber(input.taskId),
            },
        },
        taskId: undefined,
    };
}