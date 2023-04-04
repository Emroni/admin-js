import * as resolvers from '@/graphql/resolvers';
import { typeDefs } from '@/graphql/typeDefs';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

const server = new ApolloServer({
    resolvers,
    typeDefs,
});

export default startServerAndCreateNextHandler(server, {
    context: async (req) => {
        // Check token
        // TODO: Check token expiration
        const token = req.headers?.authorization?.replace('Bearer ', '');
        const verified = token && jwt.verify(token, process.env.AUTH_SECRET || '');

        // Try to retrieve a user with the token
        // const user = await getUser(token);
        if (!verified) {
            throw new GraphQLError('Not authenticated', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: {
                        status: 401,
                    },
                },
            });
        }

        // Continue
        return {};
    },
});