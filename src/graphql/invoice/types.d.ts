interface Invoice extends Entity, InvoiceFields {
    client: Client;
}

interface InvoiceFields {
    clientId: number;
    number: string?;
    currency: string;
    amount: Float!
    type: string;
    description: string?;
    sentDate: Date?;
    paidDate: Date?;
}

interface InvoiceQuery {
    invoice: Invoice?;
}

interface InvoicesQuery {
    invoices: GraphqlList<Invoice>;
}

interface InvoicesFilter extends Partial<InvoiceFields> {
    projectId?: number;
    taskId?: number;
}