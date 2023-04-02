import * as client from './client/typeDefs';
import * as invoice from './invoice/typeDefs';
import * as project from './project/typeDefs';
import * as task from './task/typeDefs';
import * as time from './time/typeDefs';

export const typeDefs = `
    scalar DateScalar
    scalar DateTimeScalar
    scalar TimeScalar

    ${client.types}
    ${invoice.types}
    ${project.types}
    ${task.types}
    ${time.types}

    type Query {
        ${client.queries}
        ${invoice.queries}
        ${project.queries}
        ${task.queries}
        ${time.queries}
    }

    type Mutation {
        ${client.mutations}
        ${invoice.mutations}
        ${project.mutations}
        ${task.mutations}
        ${time.mutations}
    }
`;