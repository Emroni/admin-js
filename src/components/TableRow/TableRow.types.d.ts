interface TableRowProps {
    columns: TableColumn[];
    row: Entity;
    getLink?: string | ((row: Entity) => string);
}