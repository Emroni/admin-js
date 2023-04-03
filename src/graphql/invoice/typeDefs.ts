const fields = `
    clientId: Int!
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
        id: Int!
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
        times: [Int!]!
        ${fields}
    }

    input InvoicesFilter {
        projectId: Int
        taskId: Int
        ${fields.replace(/\!/g, '')}
    }
`;

export const queries = `
    Invoice: Invoice
    invoice(id: Int!): Invoice
    invoices(filter: InvoicesFilter, order: String, page: Int, perPage: Int): Invoices
`;

export const mutations = `
    invoiceCreate(input: InvoiceFields): Invoice
    invoiceDelete(id: Int!): Invoice
    invoiceUpdate(id: Int!, input: InvoiceFields): Invoice
`;