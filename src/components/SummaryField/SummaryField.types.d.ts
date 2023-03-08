interface SummaryFieldProps {
    children?: any;
    currency?: string;
    entity?: Entity?;
    label?: string;
    name: string;
    options?: EntityPropertyOption[];
    type?: ValueType;
    getLink?: string | ((entity: Entity) => string);
}