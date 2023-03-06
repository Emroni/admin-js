const fields = `
    estimatedHours: Float!
    name: String!
    price: Int!
    projectId: ID!
`;

export const types = `
    type Task {
        client: Client!
        deletable: Boolean!
        id: ID!
        project: Project!
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
        ${fields.replace(/\!/g, '')}
    }
`;

export const queries = `
    Task: Task
    task(id: ID!): Task
    tasks(filter: TasksFilter, order: String, page: Int, perPage: Int): Tasks
`;

export const mutations = `
    taskCreate(input: TaskFields): Task
    taskDelete(id: ID!): Task
    taskUpdate(id: ID!, input: TaskFields): Task
`;