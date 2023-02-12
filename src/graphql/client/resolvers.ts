import { PrismaClient } from '@prisma/client';

export const getQuery = (prisma: PrismaClient) => ({
    getClient: (_parent: any, args: getClientArgs) => prisma.client.findUnique({
        where: {
            id: Number(args.id),
        },
    }),
    getClients: () => prisma.client.findMany(),
});