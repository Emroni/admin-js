import { parseDateInterval, parseNumber, parseOrder } from '@/helpers';
import dayjs from 'dayjs';
import { prisma } from '../';

export const model = {
    deletable: () => true,
    nextDate: (parent: Expense) => {
        const today = dayjs.utc();
        const dateInterval = parseDateInterval(parent.repeats);
        let date = dayjs.utc(parent.date);
        if (dateInterval.years || dateInterval.months || dateInterval.days) {
            while (date < today) {
                date = date.add(dateInterval.days, 'day');
                date = date.add(dateInterval.months, 'month');
                date = date.add(dateInterval.years, 'year');
            }
        }
        return date;
    },
};

export const queries = {
    expense: (_parent: any, args: GraphqlGetArgs) => prisma.expense.findUnique({
        where: {
            id: parseNumber(args.id),
        },
    }),
    expenses: async (_parent: any, args: GraphqlGetArgs) => ({
        order: args.order || 'name asc',
        page: args.page,
        perPage: args.perPage,
        rows: await prisma.expense.findMany({
            orderBy: parseOrder('name asc', args.order),
            skip: (args.page && args.perPage && (args.page * args.perPage)),
            take: args.perPage,
            where: args.filter,
        }),
        total: await prisma.expense.count({
            where: args.filter,
        }),
    }),
};

export const mutations = {
    expenseCreate: (_parent: any, args: GraphqlCreateArgs<ExpenseFields>) => prisma.expense.create({
        data: args.input,
    }),
    expenseDelete: (_parent: any, args: GraphqlDeleteArgs) => prisma.expense.delete({
        where: {
            id: parseNumber(args.id),
        },
    }),
    expenseUpdate: (_parent: any, args: GraphqlUpdateArgs<ExpenseFields>) => prisma.expense.update({
        where: {
            id: parseNumber(args.id),
        },
        data: args.input,
    }),
};