interface GraphqlCreateArgs<I, R = undefined> {
    input: I;
    relations: R;
}

interface GraphqlDeleteArgs {
    id: number;
}

interface GraphqlGetArgs<F = undefined> {
    filter?: F;
    id: number;
}

interface GraphqlUpdateArgs<I> {
    id: number;
    input: I;
}