interface GraphqlCreateArgs<T> {
    input: T;
}

interface GraphqlDeleteArgs {
    id: number | string;
}

interface GraphqlGetArgs {
    id: number | string;
}

interface GraphqlUpdateArgs<T> {
    id: number;
    input: T;
}