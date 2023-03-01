interface TableProps {
    action?: ReactComponentElement<Menu>;
    children: ReactComponentElement<TableColumn>;
    order?: string?;
    rows?: IndexedObject[];
    title: string;
    getRowLink?: string | ((row: IndexedObject) => string);
    onOrderChange?(order: GraphqlOrder?): void;
}

interface TableColumn {
    align?: AlignType;
    children?: any;
    label?: string;
    name: string;
    options?: EntityPropertyOption[];
    order?: boolean;
    getLink?: string | ((row: IndexedObject) => string);
}