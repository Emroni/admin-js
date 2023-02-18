import * as client from './client/typeDefs';

export const typeDefs = `
    ${client.types}

    type Query {
        ${client.queries}
    }

    type Mutation {
        ${client.mutations}
    }
`;