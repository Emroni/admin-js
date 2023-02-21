interface IndexedObject<T = any> {
    [num: number]: T;
    [str: string]: T;
}