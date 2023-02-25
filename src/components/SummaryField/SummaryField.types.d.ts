interface SummaryFieldProps {
    children?: any;
    entity?: Entity?;
    label?: string;
    name: string;
    getLink?: string | ((entity: Entity) => string);
}