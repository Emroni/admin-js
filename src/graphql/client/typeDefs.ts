const fields = `
    email: String
    name: String!
`;

export const types = `
    type Client {
        id: ID!
        ${fields}
        projects: [Project!]!
    }

    input ClientInput {
        ${fields}
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