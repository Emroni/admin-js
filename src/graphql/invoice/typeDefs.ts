const fields = `
    clientId: ID!
    number: String
    currency: String!
    amount: Float!
    type: String!
    description: String
    sentDate: DateScalar
    paidDate: DateScalar
`;

export const types = `
    type Invoice {
        client: Client!
        deletable: Boolean!
        dueDate: DateScalar!
        dueDays: Float!
        id: ID!
        name: String!
        projects: [Project!]!
        tasks: [Task!]!
        times: [Time!]!
        workedDuration: String!
        workedHours: Float!
        ${fields}
    }

    type Invoices {
        order: String!
        page: Int!
        perPage: Int!
        rows: [Invoice!]!
        total: Int!
    }

    input InvoiceFields {
        times: [ID!]!
        ${fields}
    }

    input InvoicesFilter {
        projectId: ID
        taskId: ID
        ${fields.replace(/\!/g, '')}
    }
`;

export const queries = `
    Invoice: Invoice
    invoice(id: ID!): Invoice
    invoices(filter: InvoicesFilter, order: String, page: Int, perPage: Int): Invoices
`;

export const mutations = `
    invoiceCreate(input: InvoiceFields): Invoice
    invoiceDelete(id: ID!): Invoice
    invoiceUpdate(id: ID!, input: InvoiceFields): Invoice
`;