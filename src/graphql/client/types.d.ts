interface Client extends ClientFields {
    id: number;
    projects: Project[];
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
    clients: Client[];
}