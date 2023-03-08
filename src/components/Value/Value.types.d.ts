type ValueType = 'hours' | 'text';

interface ValueProps {
    entity?: Entity?;
    options?: EntityPropertyOption[];
    type?: ValueType;
    value?: any;
    getLink?: string | ((entity: Entity) => string);
}