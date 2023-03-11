interface Client extends Entity, ClientFields {
    estimatedHours: number;
    progress: number;
    projects: Project[];
    tasks: Task[];
    times: Time[];
    workedHours: number;
}

interface ClientFields {
    address: string?;
    currency: string;
    email: string?;
    name: string;
}

interface ClientQuery {
    client: Client?;
}

interface ClientsQuery {
    clients: GraphqlList<Client>;
}