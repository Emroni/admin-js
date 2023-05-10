interface DashboardInvoicesBillable {
    amount: number;
    client: Client;
    currency: CurrencyName;
    id: number;
    projects: Map<number, Project>;
}