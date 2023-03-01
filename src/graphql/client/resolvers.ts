import { parseNumber, parseOrder } from '@/helpers';
import { prisma } from '../';
import * as projectResolver from '../project/resolvers';

export const model = {
    deletable: (parent: Client) => prisma.project.count({
        where: {
            clientId: parent.id,
        },
    }).then(count => !count),
    projects: (parent: Client) => projectResolver.queries.projects(null, {
        filter: {
            clientId: parent.id,
        },
    }),
};

export const queries = {
    client: (_parent: any, args: GraphqlGetArgs) => prisma.client.findUnique({
        where: {
            id: parseNumber(args.id),
        },
    }),
    clients: (_parent: any, args: GraphqlGetArgs) => ({
        order: args.order || 'name asc',
        page: args.page,
        perPage: args.perPage,
        rows: prisma.client.findMany({
            orderBy: parseOrder('name asc', args.order),
            skip: (args.page && args.perPage && (args.page * args.perPage)),
            take: args.perPage,
            where: args.filter,
        }),
        total: prisma.client.count({
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