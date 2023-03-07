import dayjs from 'dayjs';
import { GraphQLScalarType } from 'graphql';

export const DateScalar = new GraphQLScalarType({
    name: 'DateScalar',
    parseValue: (value: any) => dayjs(value).utc().format('YYYY-MM-DD'),
    serialize: (value: any) => dayjs(value).utc().format('YYYY-MM-DD'),
});

export const TimeScalar = new GraphQLScalarType({
    name: 'TimeScalar',
    parseValue: (value: any) => dayjs(value).utc().format('HH:mm'),
    serialize: (value: any) => dayjs(value).utc().format('HH:mm'),
});