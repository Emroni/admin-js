import * as client from './client/resolvers';
import * as project from './project/resolvers';
import * as task from './task/resolvers';

export const Client = client.model;
export const Project = project.model;
export const Task = task.model;

export const Query = {
    ...client.queries,
    ...project.queries,
    ...task.queries,
};

export const Mutation = {
    ...client.mutations,
    ...project.mutations,
    ...task.mutations,
};