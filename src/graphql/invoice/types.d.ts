interface Invoice extends Entity, InvoiceFields {
    client: Client;
    name: string;
    times: Time[];
}

interface InvoiceFields {
    amount: Float!
    clientId: number;
    currency: CurrencyName;
    description: string?;
    number: string?;
    paidDate: string?;
    sentDate: string?;
    timesIds: number[];
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