interface Time extends Entity, TimeFields {
    client: Client;
    currency: string;
    earnings: number;
    hours: number;
    project: Project;
    task: Task;
}

interface TimeFields {
    date: string;
    duration: string;
    taskId: number;
    invoiceId: number?;
}

interface TimeQuery {
    time: Time?;
}

interface TimesQuery {
    times: GraphqlList<Time>;
}

interface TimesFilter extends Partial<TimeFields> {
    clientId?: number;
    projectId?: number;
}
