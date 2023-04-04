import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const queries = {
    hash: (_parent: any, args: AuthHashArgs) => ({
        hash: bcrypt.hash(args.input, 10),
    }),
    login: async (_parent: any, args: AuthLoginArgs) => {
        const username = args.username === process.env.AUTH_USERNAME;
        const password = await bcrypt.compare(args.password, process.env.AUTH_PASSWORD || '');
        return {
            token: (password && username) ? jwt.sign(args,  process.env.AUTH_SECRET || '') : null,
        };
    },
};