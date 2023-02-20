export const types = `
    type Project {
        billing: String!
        client: Client!
        clientId: ID!
        id: ID!
        name: String!
        status: String!
    }

    input ProjectInput {
        billing: String!
        clientId: ID!
        name: String!
        status: String!
    }

    input ProjectFilter {
        billing: String
        clientId: ID
        name: String
        status: String
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