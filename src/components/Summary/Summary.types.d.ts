interface SummaryProps {
    children: ReactComponentElement<SummaryField>;
    entity?: Entity?;
}

interface SummaryField {
    children?: any;
    name: string;
    label?: string;
    getLink?: string | ((entity: Entity) => string);
}