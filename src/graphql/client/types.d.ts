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

interface getClientQuery {
    getClient: Client?;
}

interface getClientsQuery {
    getClients: Client[];
}