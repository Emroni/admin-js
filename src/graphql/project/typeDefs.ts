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
`;

export const queries = `
    getProject(id: ID!): Project
    getProjects: [Project!]!
`;

export const mutations = `
    createProject(input: ProjectInput): Project
    deleteProject(id: ID!): Project
    updateProject(id: ID!, input: ProjectInput): Project
`;