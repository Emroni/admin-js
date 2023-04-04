import { Box, Button, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import Card from '../Card/Card';

export default function Login({ onAuthenticated }: LoginProps) {

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Get token
        const response: ApiLoginResponse = await fetch('/api/login', {
            body: JSON.stringify({
                password,
                username,
            }),
            method: 'post',
        })
            .then(response => response.json())
            .catch(error => ({ error }));

        // Check token
        if (response.token) {
            window.localStorage.setItem('token', response.token);
            onAuthenticated();
            
        } else {
            setError(response.error || 'Unauthorised');
            setLoading(false);
        }
    }

    return <Box marginX="auto" marginY={3} maxWidth={400}>
        <Card loading={loading} title="Login" >
            <Box component="form" display="flex" flexDirection="column" gap={2} onSubmit={handleSubmit}>
                <TextField placeholder="Username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <TextField placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <Button disabled={loading || !password || !username} type="submit">
                    Login
                </Button>
                {error && (
                    <Typography color="error.main">
                        {error}
                    </Typography>
                )}
            </Box>
        </Card>
    </Box>;

}