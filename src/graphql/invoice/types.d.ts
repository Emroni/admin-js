interface Invoice extends Entity, InvoiceFields {
    client: Client;
    name: string;
}

interface InvoiceFields {
    amount: Float!
    clientId: number;
    currency: string;
    description: string?;
    number: string?;
    paidDate: Date?;
    sentDate: Date?;
    type: string;
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