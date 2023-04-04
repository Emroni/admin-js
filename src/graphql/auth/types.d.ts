interface AuthHash {
    hash: string;
}

interface AuthHashArgs {
    input: string;
}

interface AuthLogin {
    token: string?;
}

interface AuthLoginArgs {
    password: string;
    username: string;
}