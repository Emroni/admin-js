export const types = `
    type Auth {
        password: String!
        username: String!
    }
`;

export const queries = `
    Auth: Auth
    login(username: String!, password: String!): Auth
`;

export const mutations = ``;