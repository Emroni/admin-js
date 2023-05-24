const fields = `
    amount: Float!
    color: String
    currency: String!
    name: String!
`;

export const types = `
    type BankAccount {
        deletable: Boolean!
        fromExpenses: [Expense!]!
        id: Int!
        invoices: [Invoice!]!
        toExpenses: [Expense!]!
        ${fields}
    }

    type BankAccounts {
        order: String!
        page: Int!
        perPage: Int!
        rows: [BankAccount!]!
        total: Int!
    }

    input BankAccountFields {
        ${fields}
    }
`;

export const queries = `
    BankAccount: BankAccount
    bankAccount(id: Int!): BankAccount
    bankAccounts(order: String, page: Int, perPage: Int): BankAccounts
`;

export const mutations = `
    bankAccountCreate(input: BankAccountFields): BankAccount
    bankAccountDelete(id: Int!): BankAccount
    bankAccountUpdate(id: Int!, input: BankAccountFields): BankAccount
`;