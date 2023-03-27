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
        id: ID!
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
        ${fields}
    }

    input InvoicesFilter {
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