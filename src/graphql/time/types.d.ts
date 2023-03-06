interface Time extends Entity, TimeFields {
    project: Project;
    task: Task;
}

interface TimeFields {
    date: string;
    duration: string;
    taskId: number;
}

interface TimeQuery {
    time: Time?;
}

interface TimesQuery {
    times: GraphqlList<Time>;
}

interface TimesFilter extends Partial<TimeFields> {
    projectId?: number;
    clientId?: number;
}
