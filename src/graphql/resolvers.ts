import * as client from './client/resolvers';
import * as project from './project/resolvers';

export const Client = client.model;
export const Project = project.model;

export const Query = {
    ...client.queries,
    ...project.queries,
};

export const Mutation = {
    ...client.mutations,
    ...project.mutations,
};