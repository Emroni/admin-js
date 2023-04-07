interface ApiHashRequest {
    input: string;
}

interface ApiHashResponse {
    hash: string;
}

interface ApiLoginRequest {
    password: string;
    username: string;
}

interface ApiLoginResponse {
    error?: string;
    token?: string?;
}

interface Entity extends IndexedObject {
    __typename: string;
    deletable: boolean;
    id: number;
}

interface EntityPropertyOption {
    id?: number | string;
    label?: string;
    name?: string;
    value?: number | string;
}