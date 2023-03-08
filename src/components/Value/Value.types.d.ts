type ValueType = 'hours' | 'money' | 'text';

interface ValueProps {
    currency?: string;
    entity?: Entity?;
    options?: EntityPropertyOption[];
    type?: ValueType;
    value?: any;
    getLink?: string | ((entity: Entity) => string);
}