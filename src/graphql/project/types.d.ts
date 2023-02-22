type ProjectBilling = 'hourly' | 'fixed';
type ProjectFilter = Partial<ProjectFields>;
type ProjectStatus = 'billed' | 'complete' | 'in_progress' | 'new' | 'on_hold';

interface Project extends ProjectFields {
    client: Client;
    id: number;
}

interface ProjectFields {
    billing: ProjectBilling;
    clientId: number;
    name: string;
    status: ProjectStatus;
}

interface ProjectQuery {
    project: Project?;
}

interface ProjectsQuery {
    projects: Project[];
}