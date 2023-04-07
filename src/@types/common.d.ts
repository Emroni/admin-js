type ValueType = 'boolean' | 'dateInterval' | 'money' | 'progress' | 'projectStatus' | 'text';

interface DateInterval {
    days: number;
    label: string;
    months: number;
    value: string;
    weeks: number;
    years: number;
}

interface IndexedObject<T = any> {
    [num: number]: T;
    [str: string]: T;
}