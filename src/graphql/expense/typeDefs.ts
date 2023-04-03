const fields = `
    active: Boolean!
    amount: Float!
    currency: String!
    date: DateScalar!
    name: String!
    repeats: String!
    type: String!
`;

export const types = `
    type Expense {
        deletable: Boolean!
        id: Int!
        nextDate: DateScalar!
        ${fields}
    }

    type Expenses {
        order: String!
        page: Int!
        perPage: Int!
        rows: [Expense!]!
        total: Int!
    }

    input ExpenseFields {
        ${fields}
    }
`;

export const queries = `
    Expense: Expense
    expense(id: Int!): Expense
    expenses(order: String, page: Int, perPage: Int): Expenses
`;

export const mutations = `
    expenseCreate(input: ExpenseFields): Expense
    expenseDelete(id: Int!): Expense
    expenseUpdate(id: Int!, input: ExpenseFields): Expense
`;