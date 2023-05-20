const fields = `
    active: Boolean!
    amount: Float!
    currency: String!
    date: DateScalar!
    fromBankAccountId: Int
    name: String!
    repeats: String!
    toBankAccountId: Int
    type: String!
`;

export const types = `
    type Expense {
        deletable: Boolean!
        fromBankAccount: BankAccount
        id: Int!
        nextDate: DateScalar!
        toBankAccount: BankAccount
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