const fields = `
    address: String
    email: String
    name: String!
`;

export const types = `
    type Client {
        deletable: Boolean!
        id: ID!
        projects: [Project!]!
        tasks: [Task!]!
        times: [Time!]!
        ${fields}
    }

    type Clients {
        order: String!
        page: Int!
        perPage: Int!
        rows: [Client!]!
        total: Int!
    }

    input ClientFields {
        ${fields}
    }
`;

export const queries = `
    Client: Client
    client(id: ID!): Client
    clients(order: String, page: Int, perPage: Int): Clients
`;

export const mutations = `
    clientCreate(input: ClientFields): Client
    clientDelete(id: ID!): Client
    clientUpdate(id: ID!, input: ClientFields): Client
`;