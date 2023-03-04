type TasksFilter = Partial<TaskFields>;

interface Task extends Entity, TaskFields {
    project: Project;
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