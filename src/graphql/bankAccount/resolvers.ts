import { parseOrder } from '@/helpers';
import { prisma } from '../';

export const model = {
    deletable: () => true, // TODO: Add deletable logic
};

export const queries = {
    bankAccount: (_parent: any, args: GraphqlGetArgs) => prisma.bankAccount.findUnique({
        where: {
            id: args.id,
        },
    }),
    bankAccounts: async (_parent: any, args: GraphqlGetArgs) => ({
        order: args.order || 'name asc',
        page: args.page,
        perPage: args.perPage,
        rows: await prisma.bankAccount.findMany({
            orderBy: parseOrder('name asc', args.order),
            skip: (args.page && args.perPage && (args.page * args.perPage)),
            take: args.perPage,
            where: args.filter,
        }),
        total: await prisma.bankAccount.count({
            where: args.filter,
        }),
    }),
};

export const mutations = {
    bankAccountCreate: (_parent: any, args: GraphqlCreateArgs<BankAccountFields>) => prisma.bankAccount.create({
        data: args.input,
    }),
    bankAccountDelete: (_parent: any, args: GraphqlDeleteArgs) => prisma.bankAccount.delete({
        where: {
            id: args.id,
        },
    }),
    bankAccountUpdate: (_parent: any, args: GraphqlUpdateArgs<BankAccountFields>) => prisma.bankAccount.update({
        where: {
            id: args.id,
        },
        data: args.input,
    }),
};