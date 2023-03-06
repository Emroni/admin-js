import * as client from './client/typeDefs';
import * as project from './project/typeDefs';
import * as task from './task/typeDefs';
import * as time from './time/typeDefs';

export const typeDefs = `
    ${client.types}
    ${project.types}
    ${task.types}
    ${time.types}

    type Query {
        ${client.queries}
        ${project.queries}
        ${task.queries}
        ${time.queries}
    }

    type Mutation {
        ${client.mutations}
        ${project.mutations}
        ${task.mutations}
        ${time.mutations}
    }
`;