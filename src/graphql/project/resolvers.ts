import { parseOrder } from '@/helpers';
import { prisma } from '../';
import * as taskResolver from '../task/resolvers';

export const model = {
    client: (parent: Project) => prisma.client.findUnique({
        where: {
            id: parent.clientId,
        },
    }),
    deletable: (parent: Project) => prisma.task.count({
        where: {
            projectId: parent.id,
        },
    }).then(count => !count),
    tasks: (parent: Project) => taskResolver.queries.tasks(null, {
        filter: {
            projectId: parent.id,
        },
    }),
};

export const queries = {
    project: (_parent: any, args: GraphqlGetArgs) => prisma.project.findUnique({
        where: {
            id: Number(args.id),
        },
    }),
    projects: (_parent: any, args: GraphqlGetArgs) => ({
        order: args.order || 'name asc',
        page: args.page,
        perPage: args.perPage,
        rows: prisma.project.findMany({
            orderBy: parseOrder('name asc', args.order),
            skip: (args.page && args.perPage && (args.page * args.perPage)),
            take: args.perPage,
            where: {
                ...args.filter,
                clientId: args.filter?.clientId ? Number(args.filter?.clientId) : undefined,
            },
        }),
        total: prisma.project.count({
            where: {
                ...args.filter,
                clientId: args.filter?.clientId ? Number(args.filter?.clientId) : undefined,
            },
        }),
    }),
};

export const mutations = {
    projectCreate: (_parent: any, args: GraphqlCreateArgs<ProjectFields>) => prisma.project.create({
        data: parseInput(args.input),
    }),
    projectDelete: (_parent: any, args: GraphqlDeleteArgs) => prisma.project.delete({
        where: {
            id: Number(args.id),
        },
    }),
    projectUpdate: (_parent: any, args: GraphqlUpdateArgs<ProjectFields>) => prisma.project.update({
        data: parseInput(args.input),
        where: {
            id: Number(args.id),
        },
    }),
};

function parseInput(input: ProjectFields) {
    return {
        ...input,
        client: {
            connect: {
                id: Number(input.clientId),
            },
        },
        clientId: undefined,
    };
}