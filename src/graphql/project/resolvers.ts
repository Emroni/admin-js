import { PrismaClient } from '@prisma/client';

export const getQueries = (prisma: PrismaClient) => ({
    getProject: (_parent: any, args: GraphqlGetArgs) => prisma.project.findUnique({
        where: {
            id: Number(args.id),
        },
    }),
    getProjects: () => prisma.project.findMany(),
});

export const getMutations = (prisma: PrismaClient) => ({
    createProject: (_parent: any, args: GraphqlCreateArgs<ProjectInput>) => prisma.project.create({
        data: parseInput(args.input),
    }),
    deleteProject: (_parent: any, args: GraphqlDeleteArgs) => prisma.project.delete({
        where: {
            id: Number(args.id),
        },
    }),
    updateProject: (_parent: any, args: GraphqlUpdateArgs<ProjectInput>) => prisma.project.update({
        data: parseInput(args.input),
        where: {
            id: Number(args.id),
        },
    }),
});

function parseInput(input: ProjectInput) {
    return {
        ...input,
        client: {
            connect: {
                id: Number(input.clientId),
            },
        },
        clientId: undefined,
    };
}