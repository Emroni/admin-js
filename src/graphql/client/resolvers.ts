import { parseNumber, parseOrder } from '@/helpers';
import { prisma } from '../';
import * as projectResolver from '../project/resolvers';
import * as taskResolver from '../task/resolvers';

export const model = {
    deletable: (parent: Client) => model.projects(parent).then(projects => !projects.total),
    projects: (parent: Client) => projectResolver.queries.projects(null, {
        filter: {
            clientId: parent.id,
        },
    }),
    tasks: (parent: Client) => model.projects(parent).then(projects => {
        return taskResolver.queries.tasks(null, {
            filter: {
                projectId: projects.rows.map(row => row.id),
            },
        });
    }),
};

export const queries = {
    client: (_parent: any, args: GraphqlGetArgs) => prisma.client.findUnique({
        where: {
            id: parseNumber(args.id),
        },
    }),
    clients: async (_parent: any, args: GraphqlGetArgs) => ({
        order: args.order || 'name asc',
        page: args.page,
        perPage: args.perPage,
        rows: await prisma.client.findMany({
            orderBy: parseOrder('name asc', args.order),
            skip: (args.page && args.perPage && (args.page * args.perPage)),
            take: args.perPage,
            where: args.filter,
        }),
        total: await prisma.client.count({
            where: args.filter,
        }),
    }),
};

export const mutations = {
    clientCreate: (_parent: any, args: GraphqlCreateArgs<ClientFields>) => prisma.client.create({
        data: args.input,
    }),
    clientDelete: (_parent: any, args: GraphqlDeleteArgs) => prisma.client.delete({
        where: {
            id: parseNumber(args.id),
        },
    }),
    clientUpdate: (_parent: any, args: GraphqlUpdateArgs<ClientFields>) => prisma.client.update({
        where: {
            id: parseNumber(args.id),
        },
        data: args.input,
    }),
};