import { parseOrder } from '@/helpers';
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
            id: Number(args.id),
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
            where: {
                ...args.filter,
                projectId: args.filter?.projectId ? Number(args.filter?.projectId) : undefined,
            },
        }),
        total: prisma.task.count({
            where: {
                ...args.filter,
                projectId: args.filter?.projectId ? Number(args.filter?.projectId) : undefined,
            },
        }),
    }),
};

export const mutations = {
    taskCreate: (_parent: any, args: GraphqlCreateArgs<TaskFields>) => prisma.task.create({
        data: parseInput(args.input),
    }),
    taskDelete: (_parent: any, args: GraphqlDeleteArgs) => prisma.task.delete({
        where: {
            id: Number(args.id),
        },
    }),
    taskUpdate: (_parent: any, args: GraphqlUpdateArgs<TaskFields>) => prisma.task.update({
        data: parseInput(args.input),
        where: {
            id: Number(args.id),
        },
    }),
};

function parseInput(input: TaskFields) {
    return {
        ...input,
        project: {
            connect: {
                id: Number(input.projectId),
            },
        },
        projectId: undefined,
    };
}