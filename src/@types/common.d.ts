interface Entity extends IndexedObject {
    __typename: string;
    id: number;
}

interface EntityPropertyOption {
    id?: number | string;
    label?: string;
    name?: string;
    value?: number | string;
}

interface IndexedObject<T = any> {
    [num: number]: T;
    [str: string]: T;
}