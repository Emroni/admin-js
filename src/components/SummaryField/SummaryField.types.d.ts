interface SummaryFieldProps {
    children?: any;
    entity?: Entity?;
    label?: string;
    name: string;
    options?: EntityPropertyOption[];
    getLink?: string | ((entity: Entity) => string);
}