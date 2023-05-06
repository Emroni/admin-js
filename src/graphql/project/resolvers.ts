import { getDurationMinutes, getHoursDuration, parseOrder } from '@/helpers';
import { prisma } from '../';
import * as taskResolver from '../task/resolvers';

export const model = {
    client: (parent: Project) => prisma.client.findUnique({
        where: {
            id: parent.clientId,
        },
    }),
    currency: (parent: Project) => model.tasks(parent).then(tasks => tasks[tasks.length - 1]?.currency),
    deletable: (parent: Project) => model.tasks(parent).then(tasks => !tasks.length),
    earnings: (parent: Project) => model.tasks(parent).then(tasks => {
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
    estimatedDuration: (parent: Project) => model.estimatedHours(parent).then(getHoursDuration),
    estimatedHours: (parent: Project) => model.tasks(parent).then(tasks => {
        if (tasks.some(task => !task.estimatedHours)) {
            return 0;
        }
        return tasks.reduce((total, task) => total + task.estimatedHours * 60, 0) / 60;
    }),
    invoices: (parent: Project) => model.times(parent).then(times => {
        return prisma.invoice.findMany({
            orderBy: parseOrder('id desc'),
            where: {
                id: {
                    in: times.map(time => time.invoiceId).filter(invoiceId => !!invoiceId) as number[],
                },
            },
        });
    }),
    progress: (parent: Project) => model.estimatedHours(parent).then(estimatedHours => {
        return estimatedHours ? model.workedHours(parent).then(workedHours => workedHours / estimatedHours) : 0;
    }),
    tasks: (parent: Project) => prisma.task.findMany({
        where: {
            projectId: parent.id,
        },
    }),
    times: (parent: Project) => model.tasks(parent).then(tasks => {
        return prisma.time.findMany({
            where: {
                taskId: {
                    in: tasks.map(task => task.id),
                },
            },
        });
    }),
    workedDuration: (parent: Project) => model.workedHours(parent).then(getHoursDuration),
    workedHours: (parent: Project) => model.times(parent).then(times => {
        return times.reduce((total, time) => total + getDurationMinutes(time.duration), 0) / 60;
    }),
};

export const queries = {
    project: (_parent: any, args: GraphqlGetArgs) => prisma.project.findUnique({
        where: {
            id: args.id,
        },
    }),
    projects: async (_parent: any, args: GraphqlGetArgs) => ({
        order: args.order || 'name asc',
        page: args.page,
        perPage: args.perPage,
        rows: await prisma.project.findMany({
            orderBy: parseOrder('name asc', args.order),
            skip: (args.page && args.perPage && (args.page * args.perPage)),
            take: args.perPage,
            where: parseFilter(args.filter),
        }),
        total: await prisma.project.count({
            where: parseFilter(args.filter),
        }),
    }),
};

export const mutations = {
    projectCreate: (_parent: any, args: GraphqlCreateArgs<ProjectFields>) => prisma.project.create({
        data: parseInput(args.input),
    }),
    projectDelete: (_parent: any, args: GraphqlDeleteArgs) => prisma.project.delete({
        where: {
            id: args.id,
        },
    }),
    projectUpdate: (_parent: any, args: GraphqlUpdateArgs<ProjectFields>) => prisma.project.update({
        data: parseInput(args.input),
        where: {
            id: args.id,
        },
    }),
};

function parseFilter(filter?: ProjectsFilter) {
    const where: any = {
        ...filter,
    };

    if (where.invoiceId) {
        where.tasks = {
            some: {
                times: {
                    some: {
                        invoiceId: where.invoiceId,
                    },
                },
            },
        };
        delete where.invoiceId;
    }

    return where;
}

function parseInput(input: Partial<ProjectFields>) {
    return {
        ...input,
        client: input.clientId ? {
            connect: {
                id: input.clientId,
            },
        } : undefined,
        clientId: undefined,
    } as any;
}