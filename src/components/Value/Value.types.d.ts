type ValueType = 'boolean' | 'dateInterval' | 'money' | 'progress' | 'text';

interface ValueProps {
    currency?: string;
    options?: EntityPropertyOption[];
    type?: ValueType;
    value?: any;
}