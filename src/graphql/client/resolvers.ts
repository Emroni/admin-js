import { parseOrder } from '@/helpers';
import { prisma } from '../';

export const model = {
    deletable: (parent: Client) => model.projects(parent).then(projects => !projects.length),
    projects: (parent: Client) => prisma.project.findMany({
        orderBy: [{ name: 'asc' }], // TODO: Add order
        where: {
            clientId: parent.id,
        },
    }),
};

export const queries = {
    client: (_parent: any, args: GraphqlGetArgs) => prisma.client.findUnique({
        where: {
            id: Number(args.id),
        },
    }),
    clients: (_parent: any, args: GraphqlGetArgs) => ({
        order: args.order || 'name as',
        page: args.page,
        perPage: args.perPage,
        rows: prisma.client.findMany({
            orderBy: parseOrder('name as', args.order),
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
            id: Number(args.id),
        },
    }),
    clientUpdate: (_parent: any, args: GraphqlUpdateArgs<ClientFields>) => prisma.client.update({
        where: {
            id: Number(args.id),
        },
        data: args.input,
    }),
};