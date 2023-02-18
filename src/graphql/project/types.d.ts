type ProjectBilling = 'hourly' | 'fixed';
type ProjectStatus = 'billed' | 'complete' | 'in_progress' | 'new' | 'on_hold';

interface ProjectInput {
    billing: ProjectBilling;
    clientId: number;
    name: string;
    status: ProjectStatus;
}