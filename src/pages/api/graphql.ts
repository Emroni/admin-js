import * as resolvers from '@/graphql/resolvers';
import { typeDefs } from '@/graphql/typeDefs';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

const server = new ApolloServer({
    resolvers,
    typeDefs,
});

export default startServerAndCreateNextHandler(server);