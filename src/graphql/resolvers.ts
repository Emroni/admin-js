import { PrismaClient } from '@prisma/client';
import * as client from './client/resolvers';
import * as project from './project/resolvers';

const prisma = new PrismaClient();

export const Query = {
    ...client.getQueries(prisma),
    ...project.getQueries(prisma),
};

export const Mutation = {
    ...client.getMutations(prisma),
    ...project.getMutations(prisma),
};