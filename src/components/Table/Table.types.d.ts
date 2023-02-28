interface TableProps {
    action?: ReactComponentElement<Menu>;
    children: ReactComponentElement<TableColumn>;
    order?: TableOrder;
    rows?: IndexedObject[];
    title: string;
    getRowLink?: string | ((row: IndexedObject) => string);
    onOrderChange?(order: TableOrder?): void;
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

interface TableOrder {
    [index: string]: GraphqlOrder;
}