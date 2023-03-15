interface TableProps {
    action?: ReactComponentElement<Menu>;
    children: ReactComponentElement<TableColumn>;
    data?: GraphqlList;
    title: string;
    getRowLink?: string | ((row: Entity) => string);
    onOrderChange?(order: GraphqlOrder?): void;
    onPageChange?(page: number): void;
    onPerPageChange?(perPage: number): void;
}

interface TableColumn {
    align?: AlignType;
    children?: ReactComponentElement<TableColumnChildProps>?;
    label?: string;
    name: string;
    options?: EntityPropertyOption[];
    order?: boolean;
    type?: ValueType;
    getLink?: string | ((row: Entity) => string);
}

interface TableColumnChildProps {
    column: TableColumn;
    row: Entity;
    value: any;
}