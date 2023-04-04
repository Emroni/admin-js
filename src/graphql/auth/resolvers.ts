import jwt from 'jsonwebtoken';

export const model = {};

export const queries = {
    login: (_parent: any, args: AuthArgs) => {
        // Check values
        const username = args.username === process.env.AUTH_USERNAME;
        const password = args.password === process.env.AUTH_PASSWORD;
        const secret = process.env.AUTH_SECRET;

        // Return token
        return {
            token: (username && password && secret) ? jwt.sign(args, secret) : null,
        };
    },
};

export const mutations = {};