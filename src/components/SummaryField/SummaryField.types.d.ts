interface SummaryFieldProps {
    children?: any;
    currencyName?: CurrencyName;
    entity?: Entity?;
    label?: string;
    name: string;
    options?: EntityPropertyOption[];
    type?: ValueType;
    getLink?: string | ((entity: Entity) => string);
}

interface SummaryFieldChildProps {
    value: any;
}