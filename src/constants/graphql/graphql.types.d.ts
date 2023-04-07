type ProjectStatusType = 'billed' | 'complete' | 'in_progress' | 'on_hold';

interface ProjectStatus {
    color: string;
    label: string;
    value: ProjectStatusType;
}