interface PageProps {
    children: any;
}

interface PageState {
    pathname: string;
    query: IndexedObject;
    setName(name?: string?): void;
    setTitlePrefix(titlePrefix?: string?): void;
}