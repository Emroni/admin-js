const fields = `
    date: DateScalar!
    duration: TimeScalar!
    taskId: ID!
`;

export const types = `
    type Time {
        client: Client!
        deletable: Boolean!
        hours: Float!
        id: ID!
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
        clientId: ID
        projectId: ID
        ${fields.replace(/\!/g, '')}
    }
`;

export const queries = `
    Time: Time
    time(id: ID!): Time
    times(filter: TimesFilter, order: String, page: Int, perPage: Int): Times
`;

export const mutations = `
    timeCreate(input: TimeFields): Time
    timeDelete(id: ID!): Time
    timeUpdate(id: ID!, input: TimeFields): Time
`;