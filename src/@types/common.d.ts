type ValueType = 'boolean' | 'dateInterval' | 'money' | 'progress' | 'projectStatus' | 'text';

interface DateInterval {
    days: number;
    label: string;
    months: number;
    value: string;
    weeks: number;
    years: number;
}

interface Entity extends IndexedObject {
    __typename: string;
    deletable: boolean;
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