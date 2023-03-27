const fields = `
    currency: String
    estimatedHours: Float
    name: String
    price: Int
    projectId: ID
    rate: Int
    timer: DateTimeScalar
`;

export const types = `
    type Task {
        client: Client!
        deletable: Boolean!
        earnings: Float!
        estimatedDuration: String!
        id: ID!
        invoices: [Invoice!]!
        progress: Float!
        project: Project!
        times: [Time!]!
        workedDuration: String!
        workedHours: Float!
        ${fields}
    }

    type Tasks {
        order: String!
        page: Int!
        perPage: Int!
        rows: [Task!]!
        total: Int!
    }

    input TaskFields {
        ${fields}
    }

    input TasksFilter {
        clientId: ID
        ${fields}
    }
`;

export const queries = `
    Task: Task
    task(id: ID!): Task
    tasks(filter: TasksFilter, order: String, page: Int, perPage: Int): Tasks
    taskTimer: Task
`;

export const mutations = `
    taskCreate(input: TaskFields): Task
    taskDelete(id: ID!): Task
    taskUpdate(id: ID!, input: TaskFields): Task
    taskTimerUpdate(id: ID!): Task
`;