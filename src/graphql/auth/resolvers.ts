export const model = {};

export const queries = {
    login: (_parent: any, args: AuthLoginArgs) => ({
        password: args.password,
        username: args.username,
    }),
};

export const mutations = {};