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