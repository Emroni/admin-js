import dayjs from 'dayjs';
import { GraphQLScalarType } from 'graphql';

export const DateScalar = new GraphQLScalarType({
    name: 'DateScalar',
    parseValue: (value: any) => dayjs.utc(value).toDate(),
    serialize: (value: any) => dayjs.utc(value).format('YYYY-MM-DD'),
});

export const DateTimeScalar = new GraphQLScalarType({
    name: 'DateTimeScalar',
    parseValue: (value: any) => dayjs.utc(value).toDate(),
    serialize: (value: any) => dayjs.utc(value).format('YYYY-MM-DD HH:mm'),
});

export const TimeScalar = new GraphQLScalarType({
    name: 'TimeScalar',
    parseValue: (value: any) => dayjs.utc(`1970-01-01 ${value}`).toDate(),
    serialize: (value: any) => dayjs.utc(value).format('HH:mm'),
});