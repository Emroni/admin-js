import { PrismaClient } from '@prisma/client';

export const getEntity = (prisma: PrismaClient) => ({
    projects: (parent: Client) => prisma.project.findMany({
        where: {
            clientId: parent.id,
        },
    }),
});

export const getQueries = (prisma: PrismaClient) => ({
    getClient: (_parent: any, args: GraphqlGetArgs) => prisma.client.findUnique({
        where: {
            id: Number(args.id),
        },
    }),
    getClients: () => prisma.client.findMany(),
});

export const getMutations = (prisma: PrismaClient) => ({
    createClient: (_parent: any, args: GraphqlCreateArgs<ClientInput>) => prisma.client.create({
        data: args.input,
    }),
    deleteClient: (_parent: any, args: GraphqlDeleteArgs) => prisma.client.delete({
        where: {
            id: Number(args.id),
        },
    }),
    updateClient: (_parent: any, args: GraphqlUpdateArgs<ClientInput>) => prisma.client.update({
        where: {
            id: Number(args.id),
        },
        data: args.input,
    }),
});