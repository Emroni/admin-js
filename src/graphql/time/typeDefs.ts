const fields = `
    date: DateScalar!
    duration: TimeScalar!
    invoiceId: Int!
    taskId: Int!
`;

export const types = `
    type Time {
        client: Client!
        currency: String!
        deletable: Boolean!
        earnings: Float!
        hours: Float!
        id: Int!
        invoice: Invoice
        project: Project!
        task: Task!
        ${fields}
    }

    type Times {
        order: String!
        page: Int!
        perPage: Int!
        rows: [Time!]!
        total: Int!
    }

    input TimeFields {
        ${fields}
    }

    input TimesFilter {
        clientId: Int
        projectId: Int
        ${fields.replace(/\!/g, '')}
    }
`;

export const queries = `
    Time: Time
    time(id: Int!): Time
    times(filter: TimesFilter, order: String, page: Int, perPage: Int): Times
`;

export const mutations = `
    timeCreate(input: TimeFields): Time
    timeDelete(id: Int!): Time
    timeUpdate(id: Int!, input: TimeFields): Time
`;