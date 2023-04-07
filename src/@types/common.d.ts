type ValueType = 'boolean' | 'money' | 'progress' | 'projectStatus' | 'text';

interface DateInterval {
    days: number;
    months: number;
    value: string;
    weeks: number;
    years: number;
}

interface IndexedObject<T = any> {
    [num: number]: T;
    [str: string]: T;
}