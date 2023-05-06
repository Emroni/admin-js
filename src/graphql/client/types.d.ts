interface Client extends Entity, ClientFields {
    currency: CurrencyName;
    earnings: Money[];
    estimatedDuration: string;
    estimatedHours: number;
    invoices: Invoice[];
    progress: number;
    projects: Project[];
    tasks: Task[];
    times: Time[];
    workedDuration: string;
    workedHours: number;
}

interface ClientFields {
    address: string?;
    currency: CurrencyName;
    email: string?;
    name: string;
}

interface ClientQuery {
    client: Client?;
}

interface ClientsQuery {
    clients: GraphqlList<Client>;
}