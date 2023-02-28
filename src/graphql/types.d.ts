type GraphqlOrder = 'asc' | 'desc';

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
    order?: IndexedObject<GraphqlOrder>[];
}

interface GraphqlUpdateArgs<I> {
    id: number;
    input: I;
}