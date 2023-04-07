type ProjectBilling = 'hourly' | 'fixed';
type ProjectStatusChip = 'billed' | 'complete' | 'in_progress' | 'new' | 'on_hold';

interface Project extends Entity, ProjectFields {
    client: Client;
    currency: CurrencyName;
    earnings: number;
    estimatedDuration: string;
    estimatedHours: number;
    progress: number;
    tasks: Task[];
    times: Time[];
    workedDuration: string;
    workedHours: number;
}

interface ProjectFields {
    billing: ProjectBilling;
    clientId: number;
    name: string;
    status: ProjectStatusChip;
}

interface ProjectQuery {
    project: Project?;
}

interface ProjectsQuery {
    projects: GraphqlList<Project>;
}

interface ProjectsFilter extends Partial<ProjectFields> {
    invoiceId?: number;
}