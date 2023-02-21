interface TableProps {
    children: ReactComponentElement<TableColumn>;
    rows?: IndexedObject[];
    title: string;
}

interface TableColumn {
    align?: AlignType;
    children?: any;
    label?: string;
    name: string;
    getLink?: string | ((row: IndexedObject) => string);
}