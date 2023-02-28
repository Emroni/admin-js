const fields = `
    address: String
    currency: String!
    email: String
    name: String!
`;

export const types = `
    type Client {
        deletable: Boolean!
        id: ID!
        ${fields}
        projects: [Project!]!
    }

    type Clients {
        page: Int
        perPage: Int
        rows: [Client!]!
        total: Int
    }

    input ClientFields {
        ${fields}
    }

    input ClientsFilter {
        ${fields.replace(/\!/g, '')}
    }

    input ClientsOrder {
        id: String
        ${fields.replace(/:(.*)$/gm, ': String')}
    }
`;

export const queries = `
    Client: Client
    client(id: ID!): Client
    clients(filter: ClientsFilter, order: [ClientsOrder], page: Int, perPage: Int): Clients
`;

export const mutations = `
    clientCreate(input: ClientFields): Client
    clientDelete(id: ID!): Client
    clientUpdate(id: ID!, input: ClientFields): Client
`;