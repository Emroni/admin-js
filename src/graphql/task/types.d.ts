interface Task extends Entity, TaskFields {
    client: Client;
    earnings: number;
    estimatedDuration: string;
    progress: number;
    project: Project;
    times: Time[];
    workedDuration: string;
    workedHours: number;
    timer: Date;
}

interface TaskFields {
    currency: string;
    estimatedHours: number;
    name: string;
    price: number;
    projectId: number;
    rate: number;
}

interface TaskQuery {
    task: Task?;
}

interface TasksQuery {
    tasks: GraphqlList<Task>;
}

interface TasksFilter extends Partial<TaskFields> {
    clientId?: number;
}
