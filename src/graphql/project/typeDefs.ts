const fields = `
    billing: String!
    clientId: ID!
    name: String!
    status: String!
`;

export const types = `
    type Project {
        id: ID!
        client: Client!
        deletable: Boolean!
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
        ${fields.replace(/\!/g, '')}
    }
`;

export const queries = `
    Project: Project
    project(id: ID!): Project
    projects(filter: ProjectsFilter, order: String, page: Int, perPage: Int): Projects
`;

export const mutations = `
    projectCreate(input: ProjectFields): Project
    projectDelete(id: ID!): Project
    projectUpdate(id: ID!, input: ProjectFields): Project
`;