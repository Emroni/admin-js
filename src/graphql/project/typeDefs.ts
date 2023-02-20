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
    getProject(id: ID!): Project
    getProjects(filter: ProjectFilter): [Project!]!
`;

export const mutations = `
    createProject(input: ProjectInput): Project
    deleteProject(id: ID!): Project
    updateProject(id: ID!, input: ProjectInput): Project
`;