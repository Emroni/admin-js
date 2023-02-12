export const model = `
    type Client {
        id: ID!
        email: String
        name: String!
    }
`;

export const query = `
    getClient(id: ID!): Client
    getClients: [Client!]!
`;