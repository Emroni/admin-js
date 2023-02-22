import { prisma } from '../';

export const model = {
    client: (parent: Project) => prisma.client.findUnique({
        where: {
            id: parent.clientId,
        },
    }),
};

export const queries = {
    project: (_parent: any, args: GraphqlGetArgs) => prisma.project.findUnique({
        where: {
            id: Number(args.id),
        },
    }),
    projects: (_parent: any, args: GraphqlGetArgs<ProjectFilter>) => prisma.project.findMany({
        where: {
            ...args.filter,
            clientId: args.filter?.clientId ? Number(args.filter?.clientId) : undefined,
        },
    }),
};

export const mutations = {
    projectCreate: (_parent: any, args: GraphqlCreateArgs<ProjectFields>) => prisma.project.create({
        data: parseInput(args.input),
    }),
    projectDelete: (_parent: any, args: GraphqlDeleteArgs) => prisma.project.delete({
        where: {
            id: Number(args.id),
        },
    }),
    projectUpdate: (_parent: any, args: GraphqlUpdateArgs<ProjectFields>) => prisma.project.update({
        data: parseInput(args.input),
        where: {
            id: Number(args.id),
        },
    }),
};

function parseInput(input: ProjectFields) {
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