interface Client extends ClientFields {
    id: number;
    projects: Project[];
}

interface  ClientFields {
    email: string?;
    name: string;
}

interface ClientQuery {
    client: Client?;
}

interface ClientsQuery {
    clients: Client[];
}