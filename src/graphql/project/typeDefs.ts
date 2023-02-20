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
        ${fields}
    }

    input ProjectInput {
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
    projectCreate(input: ProjectInput): Project
    projectDelete(id: ID!): Project
    projectUpdate(id: ID!, input: ProjectInput): Project
`;