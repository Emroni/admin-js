type ValueType = 'boolean' | 'money' | 'moneyEnumeration' | 'progress' | 'text';

interface DateInterval {
    amount: number;
    days: number;
    months: number;
    unit: 'days' | 'months' | 'weeks' | 'years';
    value: string;
    weeks: number;
    years: number;
}

interface IndexedObject<T = any> {
    [num: number]: T;
    [str: string]: T;
}