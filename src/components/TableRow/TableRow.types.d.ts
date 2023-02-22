interface TableRowProps {
    columns: TableColumn[];
    row: IndexedObject;
    getLink?: string | ((row: IndexedObject) => string);
}