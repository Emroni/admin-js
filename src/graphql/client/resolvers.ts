import { prisma } from '../';

export const model = {
    projects: (parent: Client) => prisma.project.findMany({
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
    clients: () => prisma.client.findMany(),
};

export const mutations = {
    clientCreate: (_parent: any, args: GraphqlCreateArgs<ClientInput>) => prisma.client.create({
        data: args.input,
    }),
    clientDelete: (_parent: any, args: GraphqlDeleteArgs) => prisma.client.delete({
        where: {
            id: Number(args.id),
        },
    }),
    clientUpdate: (_parent: any, args: GraphqlUpdateArgs<ClientInput>) => prisma.client.update({
        where: {
            id: Number(args.id),
        },
        data: args.input,
    }),
};