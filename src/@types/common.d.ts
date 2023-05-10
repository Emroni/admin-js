type ValueType = 'boolean' | 'money' | 'moneyEnumeration' | 'progress' | 'text';

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