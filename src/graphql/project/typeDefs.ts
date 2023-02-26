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

    input ProjectFields {
        ${fields}
    }

    input ProjectFilter {
        ${fields.replace(/\!/g, '')}
    }
`;

export const queries = `
    Project: Project
    project(id: ID!): Project
    projects(filter: ProjectFilter): [Project!]!
`;

export const mutations = `
    projectCreate(input: ProjectFields): Project
    projectDelete(id: ID!): Project
    projectUpdate(id: ID!, input: ProjectFields): Project
`;