interface SummaryProps {
    children: ReactComponentElement<SummaryField>;
    entity?: IndexedObject?;
}

interface SummaryField {
    children?: any;
    name: string;
    label?: string;
}