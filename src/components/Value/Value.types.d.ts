type ValueType = 'boolean' | 'duration' | 'money' | 'progress' | 'text';

interface ValueProps {
    currency?: string;
    options?: EntityPropertyOption[];
    type?: ValueType;
    value?: any;
}