import * as client from './client/resolvers';
import * as project from './project/resolvers';
export * from './scalars';
import * as task from './task/resolvers';
import * as time from './time/resolvers';

export const Client = client.model;
export const Project = project.model;
export const Task = task.model;
export const Time = time.model;

export const Query = {
    ...client.queries,
    ...project.queries,
    ...task.queries,
    ...time.queries,
};

export const Mutation = {
    ...client.mutations,
    ...project.mutations,
    ...task.mutations,
    ...time.mutations,
};