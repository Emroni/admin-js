interface TableProps {
    actions?: ReactComponentElement<IconButtonProps>;
    children: ReactComponentElement<TableColumn>;
    rows?: IndexedObject[];
    title: string;
    getRowLink?: string | ((row: IndexedObject) => string);
}

interface TableColumn {
    align?: AlignType;
    children?: any;
    label?: string;
    name: string;
    getLink?: string | ((row: IndexedObject) => string);
}