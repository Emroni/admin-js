interface EnumerationProps {
    children: ReactComponentElement<EnumerationChildProps>?;
    items: any[];
    list?: boolean;
}

interface EnumerationChildProps {
    item: any;
}