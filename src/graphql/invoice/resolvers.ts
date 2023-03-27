import { parseNumber, parseOrder } from '@/helpers';
import { prisma } from '../';

export const model = {
    client: (parent: Invoice) => prisma.client.findUnique({
        where: {
            id: parseNumber(parent.clientId),
        },
    }),
};

export const queries = {
    invoice: (_parent: any, args: GraphqlGetArgs) => prisma.invoice.findUnique({
        where: {
            id: parseNumber(args.id),
        },
    }),
    invoices: async (_parent: any, args: GraphqlGetArgs) => ({
        order: args.order || 'id desc',
        page: args.page,
        perPage: args.perPage,
        rows: await prisma.invoice.findMany({
            orderBy: parseOrder('id desc', args.order),
            skip: (args.page && args.perPage && (args.page * args.perPage)),
            take: args.perPage,
            where: parseFilter(args.filter),
        }),
        total: await prisma.invoice.count({
            where: parseFilter(args.filter),
        }),
    }),
};

export const mutations = {
    invoiceCreate: (_parent: any, args: GraphqlCreateArgs<InvoiceFields>) => prisma.invoice.create({
        data: parseInput(args.input),
    }),
    invoiceDelete: (_parent: any, args: GraphqlDeleteArgs) => prisma.invoice.delete({
        where: {
            id: parseNumber(args.id),
        },
    }),
    invoiceUpdate: (_parent: any, args: GraphqlUpdateArgs<InvoiceFields>) => prisma.invoice.update({
        data: parseInput(args.input),
        where: {
            id: parseNumber(args.id),
        },
    }),
};

function parseFilter(filter?: InvoicesFilter) {
    return {
        ...filter,
        clientId: parseNumber(filter?.clientId),
    };
}

function parseInput(input: Partial<InvoiceFields>) {
    return {
        ...input,
        client: input.clientId ? {
            connect: {
                id: parseNumber(input.clientId),
            },
        } : undefined,
        clientId: undefined,
    } as any;
}