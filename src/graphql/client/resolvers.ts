import { prisma } from '../';

export const model = {
    projects: (parent: Client) => prisma.project.findMany({
        orderBy: [
            {
                name: 'asc',
            },
        ],
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
    clients: () => prisma.client.findMany({
        orderBy: [
            {
                name: 'asc',
            },
        ],
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