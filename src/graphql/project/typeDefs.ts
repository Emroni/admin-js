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
        page: Int
        perPage: Int
        rows: [Project!]!
        total: Int
    }

    input ProjectFields {
        ${fields}
    }

    input ProjectsFilter {
        ${fields.replace(/\!/g, '')}
    }

    input ProjectsOrder {
        id: String
        ${fields.replace(/:(.*)$/gm, ': String')}
    }
`;

export const queries = `
    Project: Project
    project(id: ID!): Project
    projects(filter: ProjectsFilter, order: [ProjectsOrder], page: Int, perPage: Int): Projects
`;

export const mutations = `
    projectCreate(input: ProjectFields): Project
    projectDelete(id: ID!): Project
    projectUpdate(id: ID!, input: ProjectFields): Project
`;