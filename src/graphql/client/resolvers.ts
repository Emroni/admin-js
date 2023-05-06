import { getDurationMinutes, getHoursDuration, parseOrder } from '@/helpers';
import { prisma } from '../';
import * as taskResolver from '../task/resolvers';

export const model = {
    deletable: (parent: Client) => model.projects(parent).then(projects => !projects.length),
    currency: (parent: Client) => model.tasks(parent).then(tasks => tasks[tasks.length - 1]?.currency),
    earnings: (parent: Client) => model.tasks(parent).then(tasks => {
        // TODO: Is there a better way to do this?
        const tasksEarnings = tasks.map(task => taskResolver.model.earnings(task as Task));
        return Promise.all(tasksEarnings).then(tasksEarnings => {
            const map: Map<string, number> = new Map();
            tasksEarnings.forEach(taskEarnings => {
                taskEarnings.forEach(taskEarning => {
                    const amount = (map.get(taskEarning.currency) || 0) + taskEarning.amount;
                    map.set(taskEarning.currency, amount);
                });
            });
            return Array.from(map).map(([currency, amount]) => ({
                amount,
                currency,
            }));
        })
    }),
    estimatedDuration: (parent: Client) => model.estimatedHours(parent).then(getHoursDuration),
    estimatedHours: (parent: Client) => model.tasks(parent).then(tasks => {
        if (tasks.some(task => !task.estimatedHours)) {
            return 0;
        }
        return tasks.reduce((total, task) => total + task.estimatedHours * 60, 0) / 60;
    }),
    invoices: (parent: Client) => prisma.invoice.findMany({
        orderBy: parseOrder('id desc'),
        where: {
            clientId: parent.id,
        },
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
    workedDuration: (parent: Client) => model.workedHours(parent).then(getHoursDuration),
    workedHours: (parent: Client) => model.times(parent).then(times => {
        return times.reduce((total, time) => total + getDurationMinutes(time.duration), 0) / 60;
    }),
};

export const queries = {
    client: (_parent: any, args: GraphqlGetArgs) => prisma.client.findUnique({
        where: {
            id: args.id,
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
            id: args.id,
        },
    }),
    clientUpdate: (_parent: any, args: GraphqlUpdateArgs<ClientFields>) => prisma.client.update({
        where: {
            id: args.id,
        },
        data: args.input,
    }),
};