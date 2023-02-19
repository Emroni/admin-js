type ProjectBilling = 'hourly' | 'fixed';
type ProjectStatus = 'billed' | 'complete' | 'in_progress' | 'new' | 'on_hold';

interface Project {
    billing: ProjectBilling;
    client: Client;
    clientId: number;
    id: number;
    name: string;
    status: ProjectStatus;
}

interface ProjectInput {
    billing: ProjectBilling;
    clientId: number;
    name: string;
    status: ProjectStatus;
}

interface GetProjectQuery {
    getProject: Project?;
}

interface GetProjectsQuery {
    getProjects: Project[];
}