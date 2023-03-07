interface Task extends Entity, TaskFields {
    client: Client;
    project: Project;
    times: Time[];
}

interface TaskFields {
    estimatedHours: number;
    name: string;
    price: number;
    projectId: number;
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
