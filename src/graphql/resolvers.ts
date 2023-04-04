export * from './scalars';
import * as client from './client/resolvers';
import * as expense from './expense/resolvers';
import * as invoice from './invoice/resolvers';
import * as project from './project/resolvers';
import * as task from './task/resolvers';
import * as time from './time/resolvers';

export const Client = client.model;
export const Expense = expense.model;
export const Invoice = invoice.model;
export const Project = project.model;
export const Task = task.model;
export const Time = time.model;

export const Query = {
    ...client.queries,
    ...expense.queries,
    ...invoice.queries,
    ...project.queries,
    ...task.queries,
    ...time.queries,
};

export const Mutation = {
    ...client.mutations,
    ...expense.mutations,
    ...invoice.mutations,
    ...project.mutations,
    ...task.mutations,
    ...time.mutations,
};