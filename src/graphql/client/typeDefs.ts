export const types = `
    type Client {
        email: String
        id: ID!
        name: String!
        projects: [Project!]!
    }

    input ClientInput {
        email: String
        name: String!
    }
`;

export const queries = `
    Client: Client
    client(id: ID!): Client
    clients: [Client!]!
`;

export const mutations = `
    clientCreate(input: ClientInput): Client
    clientDelete(id: ID!): Client
    clientUpdate(id: ID!, input: ClientInput): Client
`;