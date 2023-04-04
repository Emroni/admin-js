export const types = `
    type AuthHash {
        hash: String!
    }

    type AuthLogin {
        token: String
    }
`;

export const queries = `
    hash(input: String!): AuthHash!
    login(username: String!, password: String!): AuthLogin!
`;