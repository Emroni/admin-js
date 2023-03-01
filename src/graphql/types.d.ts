interface GraphqlCreateArgs<I, R = undefined> {
    input: I;
    relations: R;
}

interface GraphqlDeleteArgs {
    id: number;
}

interface GraphqlGetArgs {
    filter?: IndexedObject;
    id: number;
    order?: string;
    page?: number;
    perPage?: number;
}

interface GraphqlUpdateArgs<I> {
    id: number;
    input: I;
}

interface GraphqlRows<T> {
    order: []
    page: number;
    perPage: number;
    rows: T[];
    total: number;
}