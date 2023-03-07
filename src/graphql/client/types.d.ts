interface Client extends Entity, ClientFields {
    projects: Project[];
    tasks: Task[];
    times: Time[];
}

interface  ClientFields {
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