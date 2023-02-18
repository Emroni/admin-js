export const types = `
    type Client {
        email: String
        id: ID!
        name: String!
    }

    input ClientInput {
        email: String
        name: String!
    }
`;

export const queries = `
    getClient(id: ID!): Client
    getClients: [Client!]!
`;

export const mutations = `
    createClient(input: ClientInput): Client
    deleteClient(id: ID!): Client
    updateClient(id: ID!, input: ClientInput): Client
`;