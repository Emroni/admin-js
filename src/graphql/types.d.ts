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
    order?: IndexedObject<'asc' | 'desc'>[];
}

interface GraphqlUpdateArgs<I> {
    id: number;
    input: I;
}