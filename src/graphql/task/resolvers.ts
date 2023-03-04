import { parseFilterIds, parseNumber, parseOrder } from '@/helpers';
import { prisma } from '../';
import * as clientResolver from '../client/resolvers';
import * as projectResolver from '../project/resolvers';

export const model = {
    deletable: () => true, // TODO: Resolve deletable
    client: (parent: Task) => model.project(parent).then(project => {
        return clientResolver.queries.client(null, {
            id: project?.clientId,
        });
    }),
    project: (parent: Task) => projectResolver.queries.project(null, {
        id: parent.projectId,
    }),
};

export const queries = {
    task: (_parent: any, args: GraphqlGetArgs) => prisma.task.findUnique({
        where: {
            id: parseNumber(args.id),
        },
    }),
    tasks: async (_parent: any, args: GraphqlGetArgs) => ({
        order: args.order || 'id desc',
        page: args.page,
        perPage: args.perPage,
        rows: await prisma.task.findMany({
            orderBy: parseOrder('id desc', args.order),
            skip: (args.page && args.perPage && (args.page * args.perPage)),
            take: args.perPage,
            where: parseFilter(args.filter),
        }),
        total: await prisma.task.count({
            where: parseFilter(args.filter),
        }),
    }),
};

export const mutations = {
    taskCreate: (_parent: any, args: GraphqlCreateArgs<TaskFields>) => prisma.task.create({
        data: parseInput(args.input),
    }),
    taskDelete: (_parent: any, args: GraphqlDeleteArgs) => prisma.task.delete({
        where: {
            id: parseNumber(args.id),
        },
    }),
    taskUpdate: (_parent: any, args: GraphqlUpdateArgs<TaskFields>) => prisma.task.update({
        data: parseInput(args.input),
        where: {
            id: parseNumber(args.id),
        },
    }),
};

function parseFilter(filter?: TasksFilter) {
    const where: any = {
        ...filter,
    };

    if (where.clientId) {
        where.project = {
            clientId: parseFilterIds(where.clientId),
        };
        delete where.clientId;
    }

    if (where.projectId) {
        where.projectId = parseFilterIds(where?.projectId);
    }
    
    return where;
}

function parseInput(input: TaskFields) {
    return {
        ...input,
        project: {
            connect: {
                id: parseNumber(input.projectId),
            },
        },
        projectId: undefined,
    };
}