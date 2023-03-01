interface TableProps {
    action?: ReactComponentElement<Menu>;
    children: ReactComponentElement<TableColumn>;
    data?: GraphqlList;
    title: string;
    getRowLink?: string | ((row: IndexedObject) => string);
    onOrderChange?(order: GraphqlOrder?): void;
    onPageChange?(page: number): void;
    onPerPageChange?(perPage: number): void;
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