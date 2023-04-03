type ValueType = 'boolean' | 'dateInterval' | 'duration' | 'money' | 'progress' | 'text';

interface ValueProps {
    currency?: string;
    options?: EntityPropertyOption[];
    type?: ValueType;
    value?: any;
}