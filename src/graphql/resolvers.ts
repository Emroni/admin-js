import { PrismaClient } from '@prisma/client';
import * as client from './client/resolvers';

const prisma = new PrismaClient();

export const Query = {
    ...client.getQueries(prisma),
};

export const Mutation = {
    ...client.getMutations(prisma),
};