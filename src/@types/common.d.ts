interface Entity extends IndexedObject {
    __typename: string;
    id: number;
}

interface IndexedObject<T = any> {
    [num: number]: T;
    [str: string]: T;
}