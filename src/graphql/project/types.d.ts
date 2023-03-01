type ProjectBilling = 'hourly' | 'fixed';
type ProjectsFilter = Partial<ProjectFields>;
type ProjectStatus = 'billed' | 'complete' | 'in_progress' | 'new' | 'on_hold';

interface Project extends Entity, ProjectFields {
    client: Client;
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
    projects: GraphqlList<Project>;
}