export const types = `
    type Auth {
        token: String
    }
`;

export const queries = `
    Auth: Auth
    login(username: String!, password: String!): Auth
`;

export const mutations = ``;