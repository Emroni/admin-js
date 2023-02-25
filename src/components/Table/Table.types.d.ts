interface TableProps {
    action?: ReactComponentElement<Menu>;
    children: ReactComponentElement<TableColumn>;
    rows?: IndexedObject[];
    title: string;
    getRowLink?: string | ((row: IndexedObject) => string);
}

interface TableColumn {
    align?: AlignType;
    children?: any;
    label?: string;
    options?: EntityPropertyOption[];
    name: string;
    getLink?: string | ((row: IndexedObject) => string);
}