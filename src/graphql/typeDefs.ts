import * as client from './client/typeDefs';

export const typeDefs = `
    ${client.model}

    type Query {
        ${client.query}
    }
`;