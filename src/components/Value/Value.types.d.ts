type ValueType = 'hours' | 'money' | 'text';

interface ValueProps {
    currency?: string;
    options?: EntityPropertyOption[];
    type?: ValueType;
    value?: any;
}