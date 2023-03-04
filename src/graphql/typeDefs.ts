import * as client from './client/typeDefs';
import * as project from './project/typeDefs';
import * as task from './task/typeDefs';

export const typeDefs = `
    ${client.types}
    ${project.types}
    ${task.types}

    type Query {
        ${client.queries}
        ${project.queries}
        ${task.queries}
    }

    type Mutation {
        ${client.mutations}
        ${project.mutations}
        ${task.mutations}
    }
`;