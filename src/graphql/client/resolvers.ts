import { parseNumber, parseOrder } from '@/helpers';
import dayjs from 'dayjs';
import { prisma } from '../';
import * as taskResolver from '../task/resolvers';


export const model = {
    deletable: (parent: Client) => model.projects(parent).then(projects => !projects.length),
    currency: (parent: Client) => model.tasks(parent).then(tasks => tasks[0]?.currency),
    earnings: (parent: Client) => model.tasks(parent).then(tasks => {
        const tasksEarnings = tasks.map(task => taskResolver.model.earnings(task as unknown as Task));
        return Promise.all(tasksEarnings).then(tasksEarnings => tasksEarnings.reduce((total, taskEarnings) => total + taskEarnings, 0))
    }),
    estimatedHours: (parent: Client) => model.tasks(parent).then(tasks => {
        if (tasks.some(task => !task.estimatedHours)) {
            return 0;
        }
        const totalMinutes = tasks.reduce((total, task) => total + task.estimatedHours * 60, 0);
        return totalMinutes / 60;
    }),
    progress: (parent: Client) => model.estimatedHours(parent).then(estimatedHours => {
        return estimatedHours ? model.workedHours(parent).then(workedHours => workedHours / estimatedHours) : 0;
    }),
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
    workedHours: (parent: Client) => model.times(parent).then(times => {
        const totalMinutes = times.reduce((total, time) => {
            const duration = dayjs.utc(time.duration);
            return total + duration.hour() * 60 + duration.minute();
        }, 0);
        return totalMinutes / 60;
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