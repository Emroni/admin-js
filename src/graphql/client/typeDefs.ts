const fields = `
    address: String
    email: String
    name: String!
`;

export const types = `
    type Client {
        currency: String
        deletable: Boolean!
        estimatedDuration: String!
        estimatedHours: Float!
        id: Int!
        invoices: [Invoice!]!
        progress: Float!
        projects: [Project!]!
        tasks: [Task!]!
        times: [Time!]!
        workedDuration: String!
        workedHours: Float!
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
    client(id: Int!): Client
    clients(order: String, page: Int, perPage: Int): Clients
`;

export const mutations = `
    clientCreate(input: ClientFields): Client
    clientDelete(id: Int!): Client
    clientUpdate(id: Int!, input: ClientFields): Client
`;