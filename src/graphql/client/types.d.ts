interface Client {
    email: string?;
    id: number;
    name: string;
    projects: Project[];
}

interface ClientInput {
    email: string?;
    name: string;
}

interface ClientQuery {
    client: Client?;
}

interface ClientsQuery {
    clients: Client[];
}