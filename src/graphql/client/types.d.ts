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

interface GetClientQuery {
    getClient: Client?;
}

interface GetClientsQuery {
    getClients: Client[];
}