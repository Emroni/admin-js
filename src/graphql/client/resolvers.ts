import { parseNumber, parseOrder } from '@/helpers';
import { prisma } from '../';

export const model = {
    deletable: (parent: Client) => model.projects(parent).then(projects => !projects.length),
    projects: (parent: Client) => prisma.project.findMany({
        where: {
            clientId: parent.id,
        },
    }),
    tasks: (parent: Client) => model.projects(parent).then(projects => {
        return prisma.task.findMany({
            where: {
                projectId: {
                    in: projects.map(project => project.id),
                },
            },
        });
    }),
    times: (parent: Client) => model.tasks(parent).then(tasks => {
        return prisma.time.findMany({
            where: {
                taskId: {
                    in: tasks.map(task => task.id),
                },
            },
        });
    }),
};

export const queries = {
    client: (_parent: any, args: GraphqlGetArgs) => prisma.client.findUnique({
        where: {
            id: parseNumber(args.id),
        },
    }),
    clients: async (_parent: any, args: GraphqlGetArgs) => ({
        order: args.order || 'name asc',
        page: args.page,
        perPage: args.perPage,
        rows: await prisma.client.findMany({
            orderBy: parseOrder('name asc', args.order),
            skip: (args.page && args.perPage && (args.page * args.perPage)),
            take: args.perPage,
            where: args.filter,
        }),
        total: await prisma.client.count({
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
            id: parseNumber(args.id),
        },
    }),
    clientUpdate: (_parent: any, args: GraphqlUpdateArgs<ClientFields>) => prisma.client.update({
        where: {
            id: parseNumber(args.id),
        },
        data: args.input,
    }),
};