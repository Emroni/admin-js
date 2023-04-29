const fields = `
    clientId: Int!
    name: String!
    status: String!
`;

export const types = `
    type Project {
        client: Client!
        currency: String
        deletable: Boolean!
        earnings: Float!
        estimatedDuration: String!
        estimatedHours: Float!
        id: Int!
        invoices: [Invoice!]!
        progress: Float!
        tasks: [Task!]!
        times: [Time!]!
        workedDuration: String!
        workedHours: Float!
        ${fields}
    }

    type Projects {
        order: String!
        page: Int!
        perPage: Int!
        rows: [Project!]!
        total: Int!
    }

    input ProjectFields {
        ${fields}
    }

    input ProjectsFilter {
        invoiceId: Int
        ${fields.replace(/\!/g, '')}
    }
`;

export const queries = `
    Project: Project
    project(id: Int!): Project
    projects(filter: ProjectsFilter, order: String, page: Int, perPage: Int): Projects
`;

export const mutations = `
    projectCreate(input: ProjectFields): Project
    projectDelete(id: Int!): Project
    projectUpdate(id: Int!, input: ProjectFields): Project
`;