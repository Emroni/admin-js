import * as client from './client/typeDefs';
import * as project from './project/typeDefs';

export const typeDefs = `
    ${client.types}
    ${project.types}

    type Query {
        ${client.queries}
        ${project.queries}
    }

    type Mutation {
        ${client.mutations}
        ${project.mutations}
    }
`;