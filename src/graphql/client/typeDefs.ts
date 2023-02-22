const fields = `
    address: String
    currency: String!
    email: String
    name: String!
`;

export const types = `
    type Client {
        id: ID!
        ${fields}
        projects: [Project!]!
    }

    input ClientFields {
        ${fields}
    }
`;

export const queries = `
    Client: Client
    client(id: ID!): Client
    clients: [Client!]!
`;

export const mutations = `
    clientCreate(input: ClientFields): Client
    clientDelete(id: ID!): Client
    clientUpdate(id: ID!, input: ClientFields): Client
`;