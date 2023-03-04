import { parseNumber, parseOrder } from '@/helpers';
import { prisma } from '../';

export const model = {
    project: (parent: Task) => prisma.project.findUnique({
        where: {
            id: parent.projectId,
        },
    }),
    deletable: () => true, // TODO: Resolve deletable
};

export const queries = {
    task: (_parent: any, args: GraphqlGetArgs) => prisma.task.findUnique({
        where: {
            id: parseNumber(args.id),
        },
    }),
    tasks: (_parent: any, args: GraphqlGetArgs) => ({
        order: args.order || 'id desc',
        page: args.page,
        perPage: args.perPage,
        rows: prisma.task.findMany({
            orderBy: parseOrder('id desc', args.order),
            skip: (args.page && args.perPage && (args.page * args.perPage)),
            take: args.perPage,
            where: parseFilter(args.filter),
        }),
        total: prisma.task.count({
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
    return {
        ...filter,
        projectId: parseNumber(filter?.projectId),
    };
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