import { PrismaClient } from '@prisma/client';
import * as client from './client/resolvers';

const prisma = new PrismaClient();

export const Query = {
    ...client.getQuery(prisma),
};