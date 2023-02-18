interface GraphqlCreateArgs<T, R = undefined> {
    input: T;
    relations: R;
}

interface GraphqlDeleteArgs {
    id: number;
}

interface GraphqlGetArgs {
    id: number;
}

interface GraphqlUpdateArgs<T> {
    id: number;
    input: T;
}