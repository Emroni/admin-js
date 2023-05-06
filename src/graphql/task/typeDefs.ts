const fields = `
    currency: String
    estimatedHours: Float
    name: String
    price: Int
    projectId: Int
    rate: Int
    timer: DateTimeScalar
`;

export const types = `
    type Task {
        client: Client!
        deletable: Boolean!
        earnings: [Money!]!
        estimatedDuration: String!
        id: Int!
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
        clientId: Int
        invoiceId: Int
        ${fields}
    }
`;

export const queries = `
    Task: Task
    task(id: Int!): Task
    tasks(filter: TasksFilter, order: String, page: Int, perPage: Int): Tasks
    taskTimer: Task
`;

export const mutations = `
    taskCreate(input: TaskFields): Task
    taskDelete(id: Int!): Task
    taskUpdate(id: Int!, input: TaskFields): Task
    taskTimerUpdate(id: Int!): Task
`;