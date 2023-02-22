interface SummaryFieldProps {
    children?: any;
    entity?: Entity?;
    getLink?: string | ((entity: Entity) => string);
    label?: string;
    name: string;
}